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
    <h4>¿Qué ocurre en el paso inicial?</h4>
    <p>
      <i>Nota:</i> Aquí puedes escribir toda la documentación que quieras, incluir <a href="#">enlaces</a> o imágenes.
    </p>
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
