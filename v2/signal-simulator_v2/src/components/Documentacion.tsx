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
    <p><strong>Proceso de Alice para crear las claves de cifrado:</strong></p>
    <p className="ds-markdown-paragraph">Alice usa estas claves para calcular una&nbsp;<strong>clave compartida (Root Key)</strong>&nbsp;mediante&nbsp;<strong>X3DH</strong>:</p>
    <ol start={1}>
    <li><strong>Genera sus propias claves ef&iacute;meras:</strong>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Alice crea una&nbsp;<strong>clave ef&iacute;mera (EK_A)</strong>&nbsp;(usada solo para esta sesi&oacute;n).</p>
    </li>
    </ul>
    </li>
    <li><strong>Calcula 4 intercambios Diffie-Hellman (DH):</strong>
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
    <li><strong>Deriva la "clave ra&iacute;z" (Root Key) y "cadena" (Chain Key):</strong>
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
    <div>hola mundo, Paso 1</div>
);


export const Paso2Doc: React.FC = () => (
    <div>hola mundo, Paso 2</div>
);

export const Paso3Doc: React.FC = () => (
    <div>hola mundo, Paso 3</div>
);
