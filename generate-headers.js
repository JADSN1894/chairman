// import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
const buildDir = path.join(__dirname, 'build');

const cspMap = new Map();

function findCspMeta(startPath, filter = /.html$/) {
    if (!fs.existsSync(startPath)) {
        console.error(`Unable to find CSP start path: ${startPath}`);
        return;
    }
    const files = fs.readdirSync(startPath);
    const headersFile = path.join(buildDir, '_headers');
    fs.writeFileSync(headersFile, `/*`);

    files.forEach((item) => {
        const filename = path.join(startPath, item);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            findCspMeta(filename, filter);
        }
    });
}

function createHeaders() {
    const headers = `
    X-Frame-Options: DENY
    X-XSS-Protection: 1; mode=block
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: accelerometer=(), camera=(), document-domain=(), encrypted-media=(), gyroscope=(), interest-cohort=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), sync-xhr=(), usb=(), xr-spatial-tracking=(), geolocation=()
    Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
`;
    const cspArray = [];
    cspMap.forEach((csp, pagePath) => cspArray.push(`${pagePath}  Content-Security-Policy: ${csp}`),);

    const headersFile = path.join(buildDir, '_headers');

    fs.appendFileSync(headersFile, `${headers}${cspArray.join('')}`);
}

async function main() {
    findCspMeta(buildDir);
    createHeaders();
}

main();