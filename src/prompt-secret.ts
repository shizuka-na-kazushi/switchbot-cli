function _promptSecret(prompt: string, done: (secret: string) => void) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);

  let password = '';
  let isProcessing = false;
  process.stdout.write(`${prompt}: `);
  process.stdin.on('data', function(ch: string) {
    if (isProcessing) return;

    ch = ch + '';

    // backspace
    if (ch.charCodeAt(0) === 127) {
      password = password.slice(0, -1);
      return;
    }

    switch (ch) {
      case '\n':
      case '\r':
      case '\u0004':
        isProcessing = true;
        // They've finished typing their password
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.removeAllListeners("data");
        process.stdout.write('\n');
        done(password);
        break;
      case '\u0003':
        // Ctrl C
        process.stdin.removeAllListeners("data");
        process.exit(-1);
      default:
        // More password characters
        password += ch;
        break;
    }
  });
}

export default async function promptSecret(prompt: string) : Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      _promptSecret(prompt, (password) => {resolve(password)});
    } catch (e) {
      reject(e);
    }
  });
};
