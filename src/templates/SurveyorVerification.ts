export const SurveyorVerification = (url: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <body>
    <main>
      <section>
         <p>Kindly click this <a href=${url}>link</a> to verify your account.</p>
      </section>
    </main>
  </body>
  </html>
  `;
};
