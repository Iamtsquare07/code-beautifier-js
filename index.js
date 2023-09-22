function beautifyCode(inputCode, fileType) {
    let beautifiedCode = '';

    if (fileType === 'css') {
        // Format CSS code
        beautifiedCode = inputCode
            .replace(/\s*{\s*/g, ' {\n  ')
            .replace(/\s*;\s*/g, ';\n  ')
            .replace(/\s*}\s*/g, '\n}\n')
            .replace(/\n\s*\n/g, '\n'); // Remove extra blank lines
    } else if (fileType === 'html') {
        // Format HTML code using js-beautify
        beautifiedCode = beautify_html(inputCode, {
            indent_size: 2,
            wrap_line_length: 0,
        });
    } else if (fileType === 'javascript') {
        // Format JavaScript code manually
        beautifiedCode = beautifyJavaScript(inputCode);
    } else {
        // Unsupported file type
        return 'Unsupported file type';
    }

    return beautifiedCode;
}

function beautifyJavaScript(inputCode) {
    const tabWidth = 2;
    const lines = inputCode.split('\n');
    let level = 0;
    let beautifiedCode = '';

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.endsWith('}') || trimmedLine.endsWith(']);')) {
            level--;
        }

        beautifiedCode += ' '.repeat(level * tabWidth) + line + '\n';

        if (trimmedLine.endsWith('{') || trimmedLine.endsWith('([')) {
            level++;
        }
    }

    return beautifiedCode;
}

const inputCodeElement = document.getElementById('input-code');


function process(fileType) {
    const inputCode = inputCodeElement.value;

    try {
        const beautifiedCode = beautifyCode(inputCode, fileType);
        inputCodeElement.value = beautifiedCode; // Set the formatted code back into the textarea
    } catch (error) {
        inputCodeElement.value = 'An error occurred while formatting the code.';
        console.error(error);
    }
}



document.getElementById('html').addEventListener('click', () => process('html'));
document.getElementById('css').addEventListener('click', () => process('css'));
document.getElementById('javascript').addEventListener('click', () => process('javascript'));