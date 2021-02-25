function htmlEmail(name, url) {
  return `<div class="m_1964619284456966581mj-column-px-900" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%">
  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#165193;border-radius:10px;vertical-align:middle" width="100%">
    <tbody><tr>
      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
          <tbody>
            <tr>
              <td style="width:275px">
                <img height="auto" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="275">
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>

      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word">

        <div style="font-family:Open Sans;font-size:20px;font-weight:Bold;line-height:1;text-align:center;color:#ffffff">Bem-vindo(a), ${name}</div>
      </td>
    </tr>
    <tr>
      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word">

        <div style="font-family:Open Sans;font-size:16px;line-height:1;text-align:center;color:#ffffff">Utilize esse link para alterar sua senha em nossa plataforma. </br> <a style="font-family:Open Sans;font-size:20px;font-weight:Bold;line-height:1;text-align:center;color:#fff" href="${url}">Link</a></div>
      </td>
    </tr>
    <tr>
      <td style="font-size:0px;word-break:break-word">

        <div style="height:35px"> &nbsp; </div>

      </td>
    </tr>
    <tr>
      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px">
          <tbody>
            <tr>
              <td style="width:75px">
                <img height="auto" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px" width="75">
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody></table>
</div>`;
}

module.exports = htmlEmail;
