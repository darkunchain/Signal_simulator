import React from "react";

export const PasoInDoc: React.FC = () => (
  <div>
    <h1><strong>1. Identity Key (Clave de Identidad)</strong></h1>
    <h2><strong>&iquest;Qu&eacute; es?</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Es un par de claves&nbsp;<strong>asim&eacute;tricas de largo plazo</strong>&nbsp;(generalmente&nbsp;<strong>Curve25519</strong>&nbsp;en ECC).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Act&uacute;a como la&nbsp;<strong>"identidad criptogr&aacute;fica" permanente</strong>&nbsp;del usuario (similar a un certificado digital).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong>No es ef&iacute;mera</strong>: Se genera una vez durante el registro del dispositivo y persiste mientras el usuario no la cambie manualmente o reinstale la app.</p>
    </li>
    </ul>
    <h2><strong>Generaci&oacute;n y almacenamiento</strong></h2>
    <ol start={1}>
    <li><strong>Creaci&oacute;n</strong>:
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Se genera un par de claves&nbsp;<strong>(clave privada + clave p&uacute;blica)</strong>&nbsp;al instalar la app (ej.: WhatsApp).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">La&nbsp;<strong>clave privada</strong>&nbsp;nunca sale del dispositivo (se guarda en el almacenamiento seguro, como el Keychain en iOS o Keystore en Android).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">La&nbsp;<strong>clave p&uacute;blica</strong>&nbsp;se sube al servidor de WhatsApp/Signal y se comparte con otros usuarios para establecer sesiones.</p>
    </li>
    </ul>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong>Uso</strong>:</p>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Se usa en&nbsp;<strong>X3DH</strong>&nbsp;para autenticar al usuario y derivar claves compartidas.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Firma digitalmente las&nbsp;<strong>Signed PreKeys</strong>&nbsp;(para probar que son leg&iacute;timas).</p>
    </li>
    </ul>
    </li>
    </ol>
    <h2><strong>&iquest;Cu&aacute;ndo cambia?</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph"><strong>Normalmente NO cambia</strong>, a menos que:</p>
    <ul style={{listStyleType: "disc"}}>
    <li>
    <p className="ds-markdown-paragraph">El usuario reinstale la app o borre datos.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">&nbsp;</p>
    <p className="ds-markdown-paragraph">Hay una&nbsp;<strong>compromiso de seguridad</strong>&nbsp;(ej.: robo del dispositivo).</p>
    </li>
    </ul>
    </li>
    </ul>
    <hr />
    <h1><strong>2. Signed PreKey (Clave Prefirmada)</strong></h1>
    <h2><strong>&iquest;Qu&eacute; es?</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Es un par de claves&nbsp;<strong>asim&eacute;tricas de medio plazo</strong>&nbsp;(tambi&eacute;n&nbsp;<strong>Curve25519</strong>), pero con una vida &uacute;til m&aacute;s corta que la Identity Key.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong>Firmada por la Identity Key</strong>&nbsp;para garantizar su autenticidad.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Se usa en el intercambio&nbsp;<strong>X3DH</strong>&nbsp;para establecer sesiones iniciales sin requerir que el receptor est&eacute; online.</p>
    </li>
    </ul>
    <h2><strong>Generaci&oacute;n y almacenamiento</strong></h2>
    <ol start={1}>
    <li>
    <p className="ds-markdown-paragraph"><strong>Creaci&oacute;n</strong>:</p>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">El dispositivo genera un nuevo par de claves&nbsp;<strong>(Signed PreKey privada + p&uacute;blica)</strong>&nbsp;peri&oacute;dicamente (ej.: cada 1-7 d&iacute;as).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">La&nbsp;<strong>clave p&uacute;blica</strong>&nbsp;se firma con la&nbsp;<strong>Identity Key privada</strong>&nbsp;(para probar que es leg&iacute;tima).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">La&nbsp;<strong>clave firmada</strong>&nbsp;se sube al servidor junto con la clave p&uacute;blica.</p>
    </li>
    </ul>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong>Uso</strong>:</p>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Cuando alguien quiere enviar un mensaje, el servidor proporciona al emisor la&nbsp;<strong>Signed PreKey p&uacute;blica</strong>&nbsp;del receptor.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Permite establecer una sesi&oacute;n segura incluso si el receptor est&aacute; offline (<strong>asincron&iacute;a</strong>).</p>
    </li>
    </ul>
    </li>
    </ol>
    <h2><strong>&iquest;Cu&aacute;ndo cambia?</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph"><strong>Rotaci&oacute;n peri&oacute;dica</strong>:</p>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">WhatsApp/Signal renueva las Signed PreKeys cada cierto tiempo (ej.: semanalmente).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">El servidor almacena varias Signed PreKeys antiguas por si hay mensajes pendientes.</p>
    </li>
    </ul>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong>Cambios forzados</strong>:</p>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Si se agotan las claves (ej.: se usan todas las One-Time PreKeys).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Reinstalaci&oacute;n de la app.</p>
    </li>
    </ul>
    </li>
    </ul>
  </div>
);


export const Paso0Doc: React.FC = () => (
  <div>
    <p>Cuando&nbsp;<strong>Alice</strong>&nbsp;quiere enviar un mensaje a&nbsp;<strong>Bob</strong>&nbsp;por primera vez (o despu&eacute;s de una rotaci&oacute;n de claves), WhatsApp/Signal sigue un protocolo detallado para establecer una sesi&oacute;n segura usando&nbsp;<strong>X3DH</strong>&nbsp;y&nbsp;<strong>Double Ratchet</strong>. Aqu&iacute; est&aacute; el desglose paso a paso:</p>
    <hr />
    <h1><strong>1. Intercambio Inicial de Claves (X3DH)</strong></h1>
    <p>Antes de cifrar el mensaje, Alice necesita obtener las claves p&uacute;blicas de Bob y derivar una&nbsp;<strong>clave compartida</strong>. El servidor de WhatsApp act&uacute;a como intermediario para este intercambio:</p>
    <h2><strong>Claves que el servidor env&iacute;a a Alice:</strong></h2>
    <p className="ds-markdown-paragraph">Cuando Alice inicia una conversaci&oacute;n con Bob, el servidor le proporciona:</p>
    <ol start={1}>
    <li>
    <h3 className="ds-markdown-paragraph"><strong>Identity Key p&uacute;blica de Bob (IK_B)</strong></h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Clave de largo plazo que autentica la identidad de Bob.</p>
    </li>
    </ul>
    </li>
    <li>
    <h3 className="ds-markdown-paragraph"><strong>Signed PreKey p&uacute;blica de Bob (SPK_B)</strong></h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Clave de medio plazo firmada por la Identity Key de Bob (para garantizar autenticidad).</p>
    </li>
    </ul>
    </li>
    <li>
    <h3 className="ds-markdown-paragraph"><strong>(Opcional) One-Time PreKey de Bob (OPK_B)</strong></h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Clave ef&iacute;mera pregenerada por Bob (si est&aacute; disponible, a&ntilde;ade seguridad adicional).</p>
    </li>
    </ul>
    </li>
    </ol>
    <hr />
    <h2><strong>Proceso de Alice para crear las claves de cifrado:</strong></h2>
    <p className="ds-markdown-paragraph">Alice usa estas claves para calcular una&nbsp;<strong>clave compartida (Root Key)</strong>&nbsp;mediante&nbsp;<strong>X3DH</strong>:</p>
    <ol start={1}>
    <li><h3><strong>Genera sus propias claves ef&iacute;meras:</strong></h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Alice crea una&nbsp;<strong>clave ef&iacute;mera (EK_A)</strong>&nbsp;(usada solo para esta sesi&oacute;n).</p>
    </li>
    </ul>
    </li>
    <li><h3><strong>Calcula 4 intercambios Diffie-Hellman (DH):</strong></h3>
    <p className="ds-markdown-paragraph"><br />Alice combina sus claves con las de Bob para derivar secretos compartidos:</p>
    <ul>
    <li>
    <p className="ds-markdown-paragraph"><code>DH1 = DH(IK_A, SPK_B)</code><br /><em>(Identity Key de Alice + Signed PreKey de Bob)</em></p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><code>DH2 = DH(EK_A, IK_B)</code><br /><em>(Clave ef&iacute;mera de Alice + Identity Key de Bob)</em></p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><code>DH3 = DH(EK_A, SPK_B)</code><br /><em>(Clave ef&iacute;mera de Alice + Signed PreKey de Bob)</em></p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><code>DH4 = DH(EK_A, OPK_B)</code>&nbsp;<em>(si OPK_B existe)</em></p>
    </li>
    </ul>
    </li>
    <li><h3><strong>Deriva la "clave ra&iacute;z" (Root Key) y "cadena" (Chain Key):</strong></h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Concatena los resultados (<code>DH1 || DH2 || DH3 || DH4</code>) y aplica un&nbsp;<strong>KDF</strong>&nbsp;(funci&oacute;n de derivaci&oacute;n de claves, como HKDF).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Obtiene:</p>
    <ul>
    <li>
    <p className="ds-markdown-paragraph"><strong>Root Key</strong>: Clave maestra para la sesi&oacute;n.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong>Chain Key</strong>: Clave inicial para derivar&nbsp;<strong>Message Keys</strong>&nbsp;(usadas por mensaje).</p>
    </li>
    </ul>
    </li>
    </ul>
    </li>
    </ol>
  </div>
);



export const Paso1Doc: React.FC = () => (
    <div>
      <h2><strong>1. Estado despu&eacute;s de X3DH y HKDF</strong></h2>
      <p>Tras ejecutar&nbsp;<strong>X3DH</strong>, Alice y Bob tienen:</p>
      <ul>
      <li><strong><code>Root Key</code>&nbsp;(RK)</strong>: Clave maestra derivada del intercambio DH.</li>
      <li><strong><code>Chain Key</code>&nbsp;(CK)</strong>: Clave para derivar&nbsp;<code>Message Keys</code>&nbsp;(una por mensaje).</li>
      </ul>
      <p>Alice quiere enviar&nbsp;<strong>"Hola Bob"</strong>.</p>
      <hr />
      <h2><strong>2. Cifrado del mensaje (Double Ratchet)</strong></h2>
      <h3><strong>Paso 1: Derivar la Message Key</strong><strong data-start="401" data-end="422">&nbsp;(MKₙ)</strong> y la siguiente Chain Key</h3>
      <ol data-start="449" data-end="921">
      <li data-start="449" data-end="488">
      <p><strong data-start="452" data-end="470">Entrada actual</strong>: <code data-start="472" data-end="478">CKₛₙ</code> (32 B).</p>
      </li>
      <li data-start="489" data-end="826">
      <p>Ejecuta <strong data-start="500" data-end="516">HMAC-SHA-256</strong> dos veces con etiquetas de 1 byte:</p>
      <div className="_tableContainer_80l1q_1">
      <div className="_tableWrapper_80l1q_14 group flex w-fit flex-col-reverse" tabIndex={-1}>
      <table className="w-fit min-w-(--thread-content-width)" style={{width: "386px"}} data-start="558" data-end="826">
      <thead data-start="558" data-end="621">
      <tr data-start="558" data-end="621">
      <th style={{width: "94px"}} data-start="558" data-end="567" data-col-size="sm">Salida</th>
      <th style={{width: "187.75px"}} data-start="567" data-end="611" data-col-size="sm">F&oacute;rmula</th>
      <th style={{width: "78.25px"}} data-start="611" data-end="621" data-col-size="sm">Tama&ntilde;o</th>
      </tr>
      </thead>
      <tbody data-start="692" data-end="826">
      <tr data-start="692" data-end="756">
      <td style={{width: "94px"}} data-start="692" data-end="703" data-col-size="sm"><strong data-start="694" data-end="701">MKₙ</strong></td>
      <td style={{width: "187.75px"}} data-col-size="sm" data-start="703" data-end="746"><code data-start="705" data-end="723">HMAC(CKₛₙ, 0x01)</code></td>
      <td style={{width: "78.25px"}} data-col-size="sm" data-start="746" data-end="756">32 B</td>
      </tr>
      <tr data-start="760" data-end="826">
      <td style={{width: "94px"}} data-start="760" data-end="773" data-col-size="sm"><strong data-start="762" data-end="772">CKₛₙ₊₁</strong></td>
      <td style={{width: "187.75px"}} data-col-size="sm" data-start="773" data-end="816"><code data-start="775" data-end="793">HMAC(CKₛₙ, 0x02)</code></td>
      <td style={{width: "78.25px"}} data-col-size="sm" data-start="816" data-end="826">32 B</td>
      </tr>
      </tbody>
      </table>
      <div className="sticky end-(--thread-content-margin) h-0 self-end select-none">&nbsp;</div>
      </div>
      </div>
      </li>
      <li data-start="828" data-end="874">
      <p><strong data-start="831" data-end="853">Se descarta <code data-start="845" data-end="851">CKₛₙ</code></strong> (forward secrecy).</p>
      </li>
      <li data-start="875" data-end="921">
      <p>Se guarda <code data-start="888" data-end="896">CKₛₙ₊₁</code> para el pr&oacute;ximo mensaje.</p>
      </li>
      </ol>
      <p>&nbsp;</p>
      <h3><strong>Paso 2:&nbsp;</strong>Generaci&oacute;n del <strong data-start="950" data-end="959">nonce</strong></h3>
      <ul data-start="961" data-end="1188">
      <li data-start="961" data-end="1037">Algoritmo AEAD: <strong data-start="979" data-end="1001">XChaCha20-Poly1305</strong> &rarr; requiere <strong data-start="1013" data-end="1034">nonce de 24 bytes</strong>.</li>
      <li data-start="1038" data-end="1110">WhatsApp genera 24 bytes aleatorios con CSPRNG (&uacute;nicos por mensaje).</li>
      <li data-start="1111" data-end="1188">El nonce <strong data-start="1122" data-end="1137">va en claro</strong> en el encabezado, pero est&aacute; cubierto por Poly1305.</li>
      </ul>
      <p>&nbsp;</p>
      <h3><strong>Paso 3:&nbsp;</strong>Construcci&oacute;n del <strong data-start="1219" data-end="1240">encabezado Signal</strong></h3>
      <div className="_tableContainer_80l1q_1">
      <div className="_tableWrapper_80l1q_14 group flex w-fit flex-col-reverse" tabIndex={-1}>
      <table className="w-fit min-w-(--thread-content-width)" style={{width: "612px", border: "1px solid #333"}} data-start="1242" data-end="2051" >
      <thead data-start="1242" data-end="1353">
      <tr data-start="1242" data-end="1353">
      <th style={{width: "132.766px", border: "1px solid #333"}} data-start="1242" data-end="1270" data-col-size="sm">Campo</th>
      <th style={{width: "257.234px", border: "1px solid #333"}} data-start="1270" data-end="1331" data-col-size="md">Qu&eacute; contiene</th>
      <th style={{width: "198px", border: "1px solid #333"}} data-start="1331" data-end="1353" data-col-size="sm">Por qu&eacute; es p&uacute;blico</th>
      </tr>
      </thead>
      <tbody data-start="1466" data-end="2051">
      <tr data-start="1466" data-end="1582">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1466" data-end="1494" data-col-size="sm"><code data-start="1468" data-end="1478">DH_pub_A</code></td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-start="1494" data-end="1555" data-col-size="md">&Uacute;ltima clave p&uacute;blica DH de Alice</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="1555" data-end="1582">Bob la usa para ratchet</td>
      </tr>
      <tr data-start="1583" data-end="1709">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1583" data-end="1611" data-col-size="sm"><code data-start="1585" data-end="1589">pn</code> (previous chain len)</td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-col-size="md" data-start="1611" data-end="1672">N&ordm; de mensajes que Alice cifr&oacute; con la DH previa</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="1672" data-end="1709">Recuperaci&oacute;n de mensajes perdidos</td>
      </tr>
      <tr data-start="1710" data-end="1817">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1710" data-end="1738" data-col-size="sm"><code data-start="1712" data-end="1715">n</code> (message number)</td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-col-size="md" data-start="1738" data-end="1799">Contador dentro de la cadena actual (<code data-start="1777" data-end="1782">CKₛ</code>)</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="1799" data-end="1817">Orden correcto</td>
      </tr>
      <tr data-start="1818" data-end="1930">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1818" data-end="1846" data-col-size="sm"><code data-start="1820" data-end="1827">nonce</code></td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-col-size="md" data-start="1846" data-end="1907">24 B generados arriba</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="1907" data-end="1930">Necesario para AEAD</td>
      </tr>
      <tr data-start="1931" data-end="2051">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1931" data-end="1959" data-col-size="sm"><em data-start="1933" data-end="1945">(opcional)</em> AD</td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-col-size="md" data-start="1959" data-end="2020">Cabecera tipo, marca de tiempo, &hellip;</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="2020" data-end="2051">Autenticado pero no cifrado</td>
      </tr>
      </tbody>
      </table>
      <div className="sticky end-(--thread-content-margin) h-0 self-end select-none">&nbsp;</div>
      </div>
      </div>
      <p>Todo el encabezado se usa como <strong data-start="2084" data-end="2108">Associated Data (AD)</strong> de Poly1305 &rarr; autenticado.</p>
      <p data-start="2053" data-end="2135">&nbsp;</p>
      <h3><strong>Paso 4:&nbsp;</strong>Cifrado del cuerpo</h3>
      <div className="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary">
      <div className="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary select-none rounded-t-2xl">&nbsp;</div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">ciphertext, tag = XChaCha20-Poly1305( </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">&nbsp; &nbsp;key = MKₙ, # 32 B </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">&nbsp; &nbsp;nonce = nonce, # 24 B</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">&nbsp; &nbsp;plaintext = "Hola Bob", # variable</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">&nbsp; &nbsp;ad = headerBytes # encabezado completo</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">)</code></div>
      </div>
      <ul data-start="2389" data-end="2515">
      <li data-start="2389" data-end="2481"><strong data-start="2391" data-end="2405">Ciphertext</strong> = mismo tama&ntilde;o que el mensaje (8 B aqu&iacute;, tras padding interno de stream).</li>
      <li data-start="2482" data-end="2515"><strong data-start="2484" data-end="2491">Tag</strong> = 16 B Poly1305.</li>
      </ul>
      <hr data-start="2517" data-end="2520" />
      <h3><strong>Paso 5:&nbsp;</strong>Paquete final enviado</h3>
      <div className="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary">
      <div className="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary select-none rounded-t-2xl">&nbsp;</div>
      <div className="sticky top-9">&nbsp;</div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">┌── <span className="hljs-selector-tag">header</span> ─────────────────────────────────────────┐ </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">│&nbsp; &nbsp; &nbsp; &nbsp;DH_pub_A (<span className="hljs-number">32</span> <span className="hljs-selector-tag">B</span>) │ pn │ n │ nonce (<span className="hljs-number">24</span> <span className="hljs-selector-tag">B</span>) │ &hellip; │ └───────────────────────────────────────────────────┘ </code></div>
      <div className="overflow-y-auto p-4" dir="ltr">&nbsp;</div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">┌── <span className="hljs-selector-tag">body</span> ───────────────────────────────────────────┐</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">│&nbsp; &nbsp; &nbsp; &nbsp;ciphertext │ tag (<span className="hljs-number">16</span> <span className="hljs-selector-tag">B</span>)&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;│ </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">└───────────────────────────────────────────────────┘ </code></div>
      </div>
      <p data-start="2884" data-end="3022"><strong data-start="2884" data-end="2909">Total para &ldquo;Hola Bob&rdquo;</strong> (8 B) &rArr;<br data-start="2917" data-end="2920" /> <code data-start="2920" data-end="2984">32 B DH + 8 B nums + 24 B nonce + 8 B ct + 16 B tag &asymp; 88 bytes</code> (aprox.; pn/n codificados en varint).</p>
    </div>
);


export const Paso2Doc: React.FC = () => (
    <div>hola mundo, Paso 2</div>
);

export const Paso3Doc: React.FC = () => (
    <div>hola mundo, Paso 3</div>
);
