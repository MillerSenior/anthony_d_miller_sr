/**
 * Generates PDF, Word, plain-text, and print views from resume page content.
 * Uses an isolated iframe so exports are not affected by page CSS or pop-up blockers.
 */
const ResumeExport = (() => {
    const FILE_BASE = 'Anthony_Miller_Resume';
    const PAGE_WIDTH_PX = 816; // 8.5in at 96dpi

    const FORMATTED_CSS = `
        html, body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #111;
            width: ${PAGE_WIDTH_PX}px;
        }
        .resume-page {
            width: ${PAGE_WIDTH_PX - 96}px;
            margin: 0 auto;
            padding: 48px 0;
            font-family: Calibri, Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.45;
            box-sizing: content-box;
        }
        h1 { font-size: 22pt; margin: 0 0 0.25rem; }
        h2 { font-size: 14pt; margin: 1.25rem 0 0.75rem; border-bottom: 1px solid #ccc; padding-bottom: 0.2rem; }
        h3 { font-size: 12pt; margin: 0 0 0.15rem; }
        .subheading { font-size: 11pt; color: #333; margin-bottom: 0.35rem; }
        .lead { font-size: 11pt; margin: 0.75rem 0; }
        p { margin: 0.25rem 0 0.5rem; }
        ul { margin: 0.25rem 0 0.75rem; padding-left: 1.25rem; }
        li { margin-bottom: 0.25rem; }
        .job-block { margin-bottom: 1rem; page-break-inside: avoid; }
        .job-dates { font-style: italic; color: #444; margin-bottom: 0.35rem; }
        a { color: #111; text-decoration: none; }
        section { page-break-inside: avoid; display: block; width: 100%; }
        .d-flex, .flex-grow-1, .flex-shrink-0, .resume-section-content {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
        }
        @media print {
            html, body { width: auto; }
            .resume-page { width: auto; padding: 0; margin: 0.5in; }
        }
    `;

    const PLAIN_TEXT_CSS = `
        html, body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #111;
        }
        body {
            font-family: "Courier New", Courier, monospace;
            font-size: 10.5pt;
            line-height: 1.35;
            margin: 0.75in;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        pre { margin: 0; font-family: inherit; white-space: pre-wrap; }
        @media print { body { margin: 0.6in; } }
    `;

    function escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    function setLoading(trigger, loading) {
        if (!trigger) return;
        if (loading) {
            trigger.dataset.originalHtml = trigger.innerHTML;
            trigger.classList.add('disabled');
            trigger.setAttribute('aria-disabled', 'true');
            if (trigger.tagName === 'BUTTON') trigger.disabled = true;
            trigger.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing…';
        } else {
            trigger.classList.remove('disabled');
            trigger.removeAttribute('aria-disabled');
            if (trigger.tagName === 'BUTTON') trigger.disabled = false;
            trigger.innerHTML = trigger.dataset.originalHtml || trigger.innerHTML;
        }
    }

    function closeMobileNav() {
        const collapse = document.getElementById('navbarResponsive');
        const toggler = document.querySelector('.navbar-toggler');
        if (!collapse || !collapse.classList.contains('show')) return;
        if (window.bootstrap && bootstrap.Collapse) {
            bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        } else if (toggler) {
            toggler.click();
        }
    }

    function cloneSectionContent(section) {
        const source = section.querySelector('.resume-section-content');
        if (!source) return null;

        const clone = source.cloneNode(true);

        clone.querySelectorAll(
            '.social-icons, .download-actions, .dev-icons, .btn-download, script, button'
        ).forEach((el) => el.remove());

        clone.querySelectorAll('.fa-li, i[class*="fa-"], i[class*="devicon"]').forEach((el) => el.remove());

        clone.querySelectorAll('.d-flex.flex-column.flex-md-row').forEach((row) => {
            const dates = row.querySelector('.flex-shrink-0');
            const body = row.querySelector('.flex-grow-1');
            if (!body) return;

            const block = document.createElement('div');
            block.className = 'job-block';
            const bodyClone = body.cloneNode(true);

            if (dates) {
                const datesEl = document.createElement('div');
                datesEl.className = 'job-dates';
                datesEl.textContent = dates.textContent.trim();
                const title = bodyClone.querySelector('h3');
                if (title) {
                    title.insertAdjacentElement('afterend', datesEl);
                } else {
                    bodyClone.prepend(datesEl);
                }
            }

            block.appendChild(bodyClone);
            row.replaceWith(block);
        });

        clone.querySelectorAll('.text-primary').forEach((el) => {
            el.style.color = '#111';
        });

        clone.querySelectorAll('a').forEach((link) => {
            const text = link.textContent.trim();
            if (text) {
                const span = document.createElement('span');
                span.textContent = text;
                link.replaceWith(span);
            }
        });

        return clone;
    }

    function buildExportBodyHtml() {
        const wrapper = document.createElement('div');
        wrapper.className = 'resume-export-document';

        document.querySelectorAll('section.resume-section').forEach((section) => {
            const content = cloneSectionContent(section);
            if (!content) return;

            const sectionEl = document.createElement('section');
            sectionEl.appendChild(content);
            wrapper.appendChild(sectionEl);
        });

        return wrapper.innerHTML;
    }

    function buildPlainText() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = buildExportBodyHtml();
        const lines = [];

        function addLine(text) {
            const cleaned = text.replace(/\s+/g, ' ').trim();
            if (cleaned) lines.push(cleaned);
        }

        wrapper.querySelectorAll('section').forEach((section) => {
            addLine('');
            section.querySelectorAll('h1, h2, h3, .subheading, .lead, .job-dates, p, li').forEach((el) => {
                addLine(el.textContent);
            });
        });

        return lines.join('\n').replace(/^\n+/, '').trim() + '\n';
    }

    function buildWordHtml(bodyHtml) {
        return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${FILE_BASE}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
<style>${FORMATTED_CSS}</style>
</head>
<body><div class="resume-page">${bodyHtml}</div></body>
</html>`;
    }

    function createExportIframe() {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.title = 'Resume export';
        iframe.style.cssText = [
            'position:fixed',
            'left:0',
            'top:0',
            `width:${PAGE_WIDTH_PX}px`,
            'height:100vh',
            'border:0',
            'opacity:0',
            'pointer-events:none',
            'z-index:-1',
        ].join(';');
        document.body.appendChild(iframe);
        return iframe;
    }

    function waitForIframe(iframe) {
        return new Promise((resolve) => {
            const done = () => resolve();
            if (iframe.contentDocument?.readyState === 'complete') {
                setTimeout(done, 50);
            } else {
                iframe.addEventListener('load', () => setTimeout(done, 50), { once: true });
            }
        });
    }

    async function mountExportInIframe(bodyHtml, css, title) {
        const iframe = createExportIframe();
        const doc = iframe.contentDocument || iframe.contentWindow.document;

        doc.open();
        doc.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title || FILE_BASE}</title>
<style>${css}</style>
</head>
<body><div class="resume-page">${bodyHtml}</div></body>
</html>`);
        doc.close();

        await waitForIframe(iframe);

        const root = doc.querySelector('.resume-page');
        return { iframe, root, doc };
    }

    function removeIframe(iframe) {
        iframe?.remove();
    }

    async function printViaIframe(bodyHtml, css, title) {
        const { iframe } = await mountExportInIframe(bodyHtml, css, title);
        const win = iframe.contentWindow;

        const cleanup = () => {
            removeIframe(iframe);
            win.removeEventListener('afterprint', cleanup);
        };

        win.addEventListener('afterprint', cleanup);
        win.focus();
        win.print();

        setTimeout(cleanup, 30000);
    }

    const PDF_PATH = 'assets/pdf/Anthony_Miller_Resume%20%E2%80%94%20Formatted.pdf';

    function downloadPdf(trigger) {
        closeMobileNav();
        const link = document.createElement('a');
        link.href = PDF_PATH;
        link.download = `${FILE_BASE}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    async function downloadWord(trigger) {
        closeMobileNav();
        setLoading(trigger, true);

        try {
            const html = buildWordHtml(buildExportBodyHtml());
            const blob = new Blob(['\ufeff', html], {
                type: 'application/msword;charset=utf-8',
            });
            downloadBlob(blob, `${FILE_BASE}.doc`);
        } finally {
            setLoading(trigger, false);
        }
    }

    async function downloadTxt(trigger) {
        closeMobileNav();
        setLoading(trigger, true);

        try {
            const text = buildPlainText();
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            downloadBlob(blob, `${FILE_BASE}.txt`);
        } finally {
            setLoading(trigger, false);
        }
    }

    async function printFormatted(trigger) {
        setLoading(trigger, true);

        try {
            await printViaIframe(buildExportBodyHtml(), FORMATTED_CSS, `${FILE_BASE} — Formatted`);
        } finally {
            closeMobileNav();
            setLoading(trigger, false);
        }
    }

    async function printPlainText(trigger) {
        setLoading(trigger, true);

        try {
            const text = buildPlainText();
            await printViaIframe(`<pre>${escapeHtml(text)}</pre>`, PLAIN_TEXT_CSS, `${FILE_BASE} — Plain Text`);
        } finally {
            closeMobileNav();
            setLoading(trigger, false);
        }
    }

    return {
        downloadPdf,
        downloadWord,
        downloadTxt,
        printFormatted,
        printPlainText,
    };
})();
