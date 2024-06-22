const getEmailHTMLStr = (otp) => {
  const htmlBody = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your OTP Code</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding: 20px 0;
          }
          .header h1 {
              margin: 0;
              font-size: 24px;
              color: #333333;
          }
          .content {
              padding: 20px;
              text-align: center;
          }
          .content p {
              font-size: 18px;
              color: #555555;
              margin: 0 0 20px;
          }
          .otp {
              display: inline-block;
              font-size: 22px;
              color: #333333;
              background-color: #f7f7f7;
              border: 1px solid #dddddd;
              padding: 10px 20px;
              border-radius: 4px;
              margin: 0 0 20px;
          }
          .footer {
              text-align: center;
              padding: 20px 0;
              font-size: 14px;
              color: #aaaaaa;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Your OTP Code</h1>
          </div>
          <div class="content">
              <p>Hello,</p>
              <p>Your One-Time Password (OTP) is:</p>
              <div class="otp">${otp}</div>
              <p>Please use this code to complete your verification. This code is valid for 5 minutes.</p>
          </div>
          <div class="footer">
              <p>If you did not request this code, please ignore this email.</p>
          </div>
      </div>
  </body>
  </html>
`;
  return htmlBody;
};

export { getEmailHTMLStr };
