import React from "react";

export const PasoInDoc: React.FC = () => (
  <div>
    <h1><strong>1. Identity Key (Clave de Identidad)</strong></h1>
    <ul>
    <h2><strong>¿Qué es?</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Es un par de claves&nbsp;<strong>asimétricas de largo plazo</strong>&nbsp;(generalmente&nbsp;<strong>Curve25519</strong>&nbsp;en ECC).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Actúa como la&nbsp;<strong>"identidad criptográfica" permanente</strong>&nbsp;del usuario (similar a un certificado digital).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong>No es efímera</strong>: Se genera una vez durante el registro del dispositivo y persiste mientras el usuario no la cambie manualmente o reinstale la app.</p>
    </li>
    </ul>
    <h2><strong>Generación y almacenamiento</strong></h2>
    <ul>
    <li><h3><strong>Creación</strong>:</h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Se genera un par de claves&nbsp;<strong>(clave privada + clave pública)</strong>&nbsp;al instalar la app (ej.: WhatsApp).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">La&nbsp;<strong>clave privada</strong>&nbsp;nunca sale del dispositivo (se guarda en el almacenamiento seguro, como el Keychain en iOS o Keystore en Android).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">La&nbsp;<strong>clave pública</strong>&nbsp;se sube al servidor de WhatsApp/Signal y se comparte con otros usuarios para establecer sesiones.</p>
    </li>
    </ul>
    </li>
    <li>
    <h3 className="ds-markdown-paragraph"><strong>Uso</strong>:</h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Se usa en&nbsp;<strong>X3DH</strong>&nbsp;para autenticar al usuario y derivar claves compartidas.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Firma digitalmente las&nbsp;<strong>Signed PreKeys</strong>&nbsp;(para probar que son legítimas).</p>
    </li>
    </ul>
    </li>
    </ul>
    <h2><strong>¿Cuándo cambia?</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph"><strong>Normalmente NO cambia</strong>, a menos que:</p>
    <ul style={{listStyleType: "disc"}}>
    <li>
    <p className="ds-markdown-paragraph">El usuario reinstale la app o borre datos.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Hay un&nbsp;<strong>compromiso de seguridad</strong>&nbsp;(ej.: robo del dispositivo).</p>
    </li>
    </ul>
    </li>
    </ul>
    </ul>
    <hr />
    <h1><strong>2. Signed PreKey (Clave Prefirmada)</strong></h1>
    <ul>
    <h2><strong>¿Qué es?</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Es un par de claves&nbsp;<strong>asimétricas de medio plazo</strong>&nbsp;(también&nbsp;<strong>Curve25519</strong>), pero con una vida útil más corta que la Identity Key.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong>Firmada por la Identity Key</strong>&nbsp;para garantizar su autenticidad.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Se usa en el intercambio&nbsp;<strong>X3DH</strong>&nbsp;para establecer sesiones iniciales sin requerir que el receptor esté online.</p>
    </li>
    </ul>
    <h2><strong>Generación y almacenamiento</strong></h2>
    <ul>
    <li>
    <h3 className="ds-markdown-paragraph"><strong>Creación</strong>:</h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">El dispositivo genera un nuevo par de claves&nbsp;<strong>(Signed PreKey privada + pública)</strong>&nbsp;periódicamente (ej.: cada 1-7 días).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">La&nbsp;<strong>clave pública</strong>&nbsp;se firma con la&nbsp;<strong>Identity Key privada</strong>&nbsp;(para probar que es legítima).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">La&nbsp;<strong>clave firmada</strong>&nbsp;se sube al servidor junto con la clave pública.</p>
    </li>
    </ul>
    </li>
    <li>
    <h3 className="ds-markdown-paragraph"><strong>Uso</strong>:</h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Cuando alguien quiere enviar un mensaje, el servidor proporciona al emisor la&nbsp;<strong>Signed PreKey pública</strong>&nbsp;del receptor.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Permite establecer una sesión segura incluso si el receptor está offline (<strong>asincronía</strong>).</p>
    </li>
    </ul>
    </li>
    </ul>
    <h2><strong>¿Cuándo cambia?</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph"><strong>Rotación periódica</strong>:</p>
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
    <p className="ds-markdown-paragraph">Reinstalación de la app.</p>
    </li>
    </ul>
    </li>
    </ul>
    </ul>
  </div>
);


export const Paso1Doc: React.FC = () => (
  <div>
    <p>Cuando&nbsp;<strong>Alice</strong>&nbsp;quiere enviar un mensaje a&nbsp;<strong>Bob</strong>&nbsp;por primera vez (o después de una rotación de claves), WhatsApp <strong>sigue un protocolo detallado para establecer una sesión segura usando X3DH y Double Ratchet</strong>. Aquí está el desglose paso a paso:</p>
    <hr />    
    <h1><strong>1. Intercambio Inicial de Claves (X3DH)</strong></h1>
    <ul>
    <p>Antes de cifrar el mensaje, Alice necesita obtener las claves públicas de Bob y derivar una&nbsp;<strong>clave compartida</strong>. El servidor de WhatsApp actúa como intermediario para este intercambio:</p>
    <h2><strong>Claves que el servidor envía a Alice:</strong></h2>
    <ul>
    <p className="ds-markdown-paragraph">Cuando Alice inicia una conversación con Bob, el servidor le proporciona:</p>
    <li>
    <h3 className="ds-markdown-paragraph"><strong>Identity Key pública de Bob (IK_B)</strong></h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Clave de largo plazo que autentica la identidad de Bob.</p>
    </li>
    </ul>
    </li>
    <li>
    <h3 className="ds-markdown-paragraph"><strong>Signed PreKey pública de Bob (SPK_B)</strong></h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Clave de medio plazo firmada por la Identity Key de Bob (para garantizar autenticidad).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Permite establecer sesiones sin necesidad de que Bob esté en línea.</p>
    </li>
    </ul>
    </li>
    <li>
    <h3 className="ds-markdown-paragraph"><strong>(Opcional) One-Time PreKey de Bob (OPK_B)</strong></h3>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Clave efímera pregenerada por Bob (si está disponible, añade seguridad adicional).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">La OPKB se usa para añadir una capa adicional de seguridad <strong>(protección contra replay attacks y forward secrecy)</strong>.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">WhatsApp genera   un lote de OPKB (ej.: 100 claves) durante el registro o periodicamente.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Cada vez que alguien inicia una sesión con Bob usando una OPKB, esta clave se elimina del servidor (no se reutiliza).</p>
    </li>
    </ul>
    </li>
    </ul>
    </ul>
    <hr />
    <h1><strong>2. Proceso de Alice para crear las claves de cifrado:</strong></h1>
    <p className="ds-markdown-paragraph">Alice usa estas claves para calcular una&nbsp;<strong>clave compartida (Root Key)</strong>&nbsp;mediante&nbsp;<strong>X3DH</strong>:</p>
    <ul>
    
    <h2><strong>1. Genera sus propias claves efímeras:</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Alice crea una&nbsp;<strong>clave efímera (EK_A)</strong>&nbsp;(usada solo para esta sesión).</p>
    </li>
    </ul>
    <h2><strong>2. Calcula 4 intercambios Diffie-Hellman (DH):</strong></h2>
    <ul>
    <p className="ds-markdown-paragraph"><br />Alice combina sus claves con las de Bob para derivar secretos compartidos:</p>
    <ul>
    <li>
    <p className="ds-markdown-paragraph"><strong><code>DH1 = DH(IK_A, SPK_B)</code></strong><br /><em>(Identity Key de Alice + Signed PreKey de Bob)</em></p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong><code>DH2 = DH(EK_A, IK_B)</code></strong><br /><em>(Clave efímera de Alice + Identity Key de Bob)</em></p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong><code>DH3 = DH(EK_A, SPK_B)</code></strong><br /><em>(Clave efímera de Alice + Signed PreKey de Bob)</em></p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong><code>DH4 = DH(EK_A, OPK_B)</code></strong>&nbsp;<em>(si OPK_B existe)</em></p>
    </li>
    </ul>
    </ul>
    <h2><strong>3. Deriva la "clave raíz" (Root Key) y "cadena" (Chain Key):</strong></h2>
    <ul>
    <li>
    <p className="ds-markdown-paragraph">Concatena los resultados (<code>DH1 || DH2 || DH3 || DH4</code>) y aplica un&nbsp;<strong>KDF</strong>&nbsp;(función de derivación de claves, como HKDF).</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph">Obtiene:</p>
    <ul>
    <li>
    <p className="ds-markdown-paragraph"><strong>Root Key</strong>: Clave maestra para la sesión.</p>
    </li>
    <li>
    <p className="ds-markdown-paragraph"><strong>Chain Key</strong>: Clave inicial para derivar&nbsp;<strong>Message Keys</strong>&nbsp;(usadas por mensaje).</p>
    </li>
    </ul>
    </li>
    </ul>
    </ul>
  </div>
);

export const Paso2Doc: React.FC = () => (
    <div>
      <h1 className="intro">1. Root Key (RK)</h1>
      <ul>
      <h3 data-start="22" data-end="36"><strong data-start="22" data-end="34">¿Qué es?</strong></h3>
      <ul>
      <li data-start="40" data-end="122">
      <p data-start="42" data-end="122">Clave simétrica de 32 bytes que constituye la "semilla" secreta de una sesión.</p>
      </li>
      <li data-start="126" data-end="258">
      <p data-start="128" data-end="258">Es el punto de partida del <strong data-start="155" data-end="173">Double-Ratchet</strong>: cada vez que se renegocia, se desprende una nueva Chain Key para cifrar mensajes.</p>
      </li>
      <li data-start="262" data-end="348">
      <p data-start="264" data-end="348"><em data-start="264" data-end="268">No</em> se envía nunca fuera de los dos dispositivos; sólo derivaciones (HKDF) de ella.</p>
      </li>
      </ul>
      <h3 data-start="353" data-end="416"><strong data-start="353" data-end="384">Generación y almacenamiento</strong></h3>
      <ul>
      <h4 data-start="353" data-end="416"><br data-start="384" data-end="387" /><strong data-start="394" data-end="414">Creación inicial</strong></h4>
      <ul data-start="420" data-end="810">
      <li data-start="420" data-end="510">
      <p data-start="422" data-end="510">Se obtiene con HKDF al terminar el protocolo <strong data-start="467" data-end="475">X3DH</strong> (mezcla de tres Diffie-Hellman).</p>
      </li>
      <li data-start="514" data-end="630">
      <p data-start="516" data-end="630">Entrada de HKDF: la "Secret" de X3DH (concatenación DH1‖DH2‖DH3‖DH4) + un <em data-start="590" data-end="596">salt</em> fijo.</p>
      </li>
      </ul>
      <h4 data-start="353" data-end="416"><br data-start="384" data-end="387" /><strong data-start="394" data-end="414">Persistencia</strong></h4>
      <ul data-start="420" data-end="810">
      <li data-start="634" data-end="778">
      <p data-start="636" data-end="778">Se guarda únicamente en RAM o en un almacén cifrado asociado a la sesión (por ejemplo, en SQLite cifrado con la Master Key del dispositivo).</p>
      </li>
      <li data-start="782" data-end="810">
      <p data-start="784" data-end="810">Nunca se sube al servidor.</p>
      </li>
      </ul>
      </ul>
      <h3 data-start="353" data-end="416"><strong data-start="353" data-end="384">¿Cuándo cambia?</strong></h3>
      <ul data-start="840" data-end="1142">
      <li data-start="840" data-end="967">
      <p data-start="842" data-end="967"><strong data-start="842" data-end="873">Al iniciar una nueva sesión</strong> (nuevo chat, reinstalación de uno de los participantes, o si se pulsa "Reiniciar cifrado").</p>
      </li>
      <li data-start="971" data-end="1142">
      <p data-start="973" data-end="1142"><strong data-start="973" data-end="1001">Tras un "re-key" forzado</strong> (por ejemplo, al detectar un posible des-sync, Signal envía automáticamente un mensaje de clave); se negocia otro X3DH y se reemplaza la RK.</p>
      </li>
      </ul>
      <hr data-start="1144" data-end="1147" />
      </ul>
      <h1 className="intro">2. Chain Key (CK)</h1>
      <ul>
      <h3 data-start="353" data-end="416"><strong data-start="353" data-end="384">¿Qué es?</strong></h3>
      <ul>
      <li data-start="1190" data-end="1262">
      <p data-start="1192" data-end="1262">Clave simétrica de 32 bytes derivada de la última Root Key con HKDF.</p>
      </li>
      <li data-start="1266" data-end="1421">
      <p data-start="1268" data-end="1334">Va evolucionando con cada mensaje usando el <strong data-start="1312" data-end="1331">ratchet de hash</strong>:</p>
      <div className="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary">
      <div className="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary select-none rounded-t-2xl"><strong>mathematica</strong></div>
      <div className="sticky top-9">
      <div className="absolute end-0 bottom-0 flex h-9 items-center pe-2">
      </div>
      </div>
      <br /><div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!"><span className="hljs-variable">CK</span>ₙ &mdash;&mdash;
      <span className="hljs-variable">HKDF</span>&rarr; <span className="hljs-variable">MK</span>ₙ <span className="hljs-punctuation">(</span><span className="hljs-built_in">Message</span> <span className="hljs-built_in">Key</span><span className="hljs-punctuation">)
      <br /></span> │ <br />└──<span className="hljs-variable">HKDF</span>&rarr; <span className="hljs-variable">CK</span>ₙ₊₁ </code></div>
      </div>
      </li>
      <li data-start="1425" data-end="1553">
      <p data-start="1427" data-end="1553">Garantiza que cada <strong data-start="1446" data-end="1466">Message Key (MK)</strong> sea única y que la compromisión futura no revele mensajes pasados (<em data-start="1534" data-end="1551">forward secrecy</em>).</p>
      </li>
      </ul>
      <h3 data-start="353" data-end="416"><strong data-start="353" data-end="384">Generación y almacenamiento</strong></h3>
      <ul>
      <h4><strong data-start="1599" data-end="1610">Inicial</strong></h4>
      <ul data-start="1616" data-end="1877">
      <li data-start="1616" data-end="1690">
      <p data-start="1618" data-end="1690">Primera CK la produce HKDF(RK, "ChainKey"‖0x01).</p>
      </li>
      </ul>
      <h4 data-start="1618" data-end="1690"><strong data-start="1676" data-end="1688">Rotación</strong></h4>
      <ul>
      <li data-start="1694" data-end="1756">
      <p data-start="1696" data-end="1756">En cada mensaje saliente se calcula MKₙ y la siguiente CK.</p>
      </li>
      <li data-start="1760" data-end="1877">
      <p data-start="1762" data-end="1877">CK va en RAM; sólo se serializa (cifrada) si el mensaje aún no se ha confirmado, para soportar reinicios de la app.</p>
      </li>
      </ul>
      </ul>
      <h3 data-start="1882" data-end="1903"><strong data-start="1882" data-end="1901">¿Cuándo cambia?</strong></h3>
      <ul data-start="1907" data-end="2071">
      <li data-start="1907" data-end="1957">
      <p data-start="1909" data-end="1957"><strong data-start="1909" data-end="1936">Con cada mensaje propio</strong> (ratchet de hash).</p>
      </li>
      <li data-start="1961" data-end="2071">
      <p data-start="1963" data-end="2071"><strong data-start="1963" data-end="2025">Cuando llega un mensaje del otro lado con nuevo DH ratchet</strong>: se genera una <strong data-start="2041" data-end="2059">nueva Root Key</strong> &rarr; nueva CK.</p>
      </li>
      </ul>
      </ul>
      <p>&nbsp;</p>
    </div>
);

export const Paso3Doc: React.FC = () => (
    <div>
      <h2><strong>1. Estado después de X3DH y HKDF</strong></h2>
      <ul>
      <p>Tras ejecutar&nbsp;<strong>X3DH</strong>, Alice y Bob tienen:</p>
      <ul>
      <li><strong><code>Root Key</code>&nbsp;(RK)</strong>: Clave maestra derivada del intercambio DH.</li>
      <li><strong><code>Chain Key</code>&nbsp;(CK)</strong>: Clave para derivar&nbsp;<code>Message Keys</code>&nbsp;(una por mensaje).</li>
      </ul>
      <p>Alice quiere enviar&nbsp;<strong>"Hola Bob"</strong>.</p>
      </ul>
      <hr />
      <h2><strong>2. Cifrado del mensaje (Double Ratchet)</strong></h2>
      <ul>
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
      <th style={{width: "187.75px"}} data-start="567" data-end="611" data-col-size="sm">Fórmula</th>
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
      <p>Se guarda <code data-start="888" data-end="896">CKₛₙ₊₁</code> para el próximo mensaje.</p>
      </li>
      </ol>
      <p>&nbsp;</p>
      <h3><strong>Paso 2:&nbsp;</strong>Generación del <strong data-start="950" data-end="959">IV</strong></h3>
      <ul data-start="961" data-end="1188">
      <li data-start="961" data-end="1037">Algoritmo: <strong data-start="979" data-end="1001">AES-256-CBC</strong> &rarr; requiere <strong data-start="1013" data-end="1034">IV de 16 bytes</strong>.</li>
      <li data-start="1038" data-end="1110">El IV se toma de los 16 bytes finales de la Message Key (MK) que sale de HKDF, por lo que no se envía un valor aleatorio aparte.</li>
      </ul>
      <p>&nbsp;</p>
      <h3><strong>Paso 3:&nbsp;</strong>Construcción del <strong data-start="1219" data-end="1240">encabezado Signal</strong></h3>
      <div className="_tableContainer_80l1q_1">
      <div className="_tableWrapper_80l1q_14 group flex w-fit flex-col-reverse" tabIndex={-1}>
      <table className="w-fit min-w-(--thread-content-width)" style={{width: "612px", border: "1px solid #333"}} data-start="1242" data-end="2051" >
      <thead data-start="1242" data-end="1353">
      <tr data-start="1242" data-end="1353">
      <th style={{width: "132.766px", border: "1px solid #333"}} data-start="1242" data-end="1270" data-col-size="sm">Campo</th>
      <th style={{width: "257.234px", border: "1px solid #333"}} data-start="1270" data-end="1331" data-col-size="md">Qué contiene</th>
      <th style={{width: "198px", border: "1px solid #333"}} data-start="1331" data-end="1353" data-col-size="sm">Por qué es público</th>
      </tr>
      </thead>
      <tbody data-start="1466" data-end="2051">
      <tr data-start="1466" data-end="1582">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1466" data-end="1494" data-col-size="sm"><code data-start="1468" data-end="1478">DH_pub_A</code></td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-start="1494" data-end="1555" data-col-size="md">última clave pública DH de Alice</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="1555" data-end="1582">Bob la usa para ratchet</td>
      </tr>
      <tr data-start="1583" data-end="1709">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1583" data-end="1611" data-col-size="sm"><code data-start="1585" data-end="1589">pn</code> (4Bytes)</td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-col-size="md" data-start="1611" data-end="1672">cuántos mensajes envió Alice con el par DH anterior</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="1672" data-end="1709">Recuperación de mensajes perdidos</td>
      </tr>
      <tr data-start="1710" data-end="1817">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1710" data-end="1738" data-col-size="sm"><code data-start="1712" data-end="1715">n</code> (message number)</td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-col-size="md" data-start="1738" data-end="1799">Contador dentro de la cadena actual (<code data-start="1777" data-end="1782">CKₛ</code>)</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="1799" data-end="1817">Orden correcto</td>
      </tr>      
      <tr data-start="1931" data-end="2051">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1931" data-end="1959" data-col-size="sm"><em data-start="1933" data-end="1945">(opcional)</em> AD</td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-col-size="md" data-start="1959" data-end="2020">Cabecera tipo, marca de tiempo, &hellip;</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="2020" data-end="2051">Autenticado pero no cifrado</td>
      </tr>
      <tr data-start="1818" data-end="1930">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1818" data-end="1846" data-col-size="sm"><code data-start="1820" data-end="1827">ciphertext</code></td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-col-size="md" data-start="1846" data-end="1907">Resultado de AES-256-CBC(K_enc, IV, plaintext); el IV (16 B) es la tercera porción de la Message-Key (MK) derivada por HKDF y no viaja en el mensaje.</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="1907" data-end="1930">Texto Cifrado</td>
      </tr>
      <tr data-start="1818" data-end="1930">
      <td style={{width: "132.766px", border: "1px solid #333"}} data-start="1818" data-end="1846" data-col-size="sm"><code data-start="1820" data-end="1827">tag (32Bytes)</code></td>
      <td style={{width: "257.234px", border: "1px solid #333"}} data-col-size="md" data-start="1846" data-end="1907">HMAC-SHA-256(K_mac, header ∥ ciphertext); proporciona integridad y autenticidad.</td>
      <td style={{width: "198px", border: "1px solid #333"}} data-col-size="sm" data-start="1907" data-end="1930">Necesario para verificación</td>
      </tr>
      </tbody>
      </table>
      <div className="sticky end-(--thread-content-margin) h-0 self-end select-none">&nbsp;</div>
      </div>
      </div>      
      <h3><strong>Paso 4:&nbsp;</strong>Cifrado del cuerpo</h3>
      <div className="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary">
      <div className="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary select-none rounded-t-2xl">&nbsp;</div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!"># 1. Cifrar el cuerpo </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">ciphertext = AES_256_CBC_encrypt( </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">&nbsp; &nbsp;key = K_enc, #32Bytes (primera parte de MKₙ)</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">&nbsp; &nbsp;iv = IV, #16Bytes (tercera parte de MKₙ; NO se envía)</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">&nbsp; &nbsp;plaintext = "Hola Bob", #variable</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">)</code></div>
      <br />
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!"># 2. Generar el tag de integridad/autenticidad </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">tag = HMAC_SHA256( </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">&nbsp; &nbsp;key = K_mac, #32Bytes (segunda parte de MKₙ)</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">&nbsp; &nbsp;data = headerBytes + ciphertext, #header completo || cuerpo cifrado</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">)</code></div>
      </div>
      <ul data-start="2389" data-end="2515">
      <li data-start="2389" data-end="2481"><strong data-start="2391" data-end="2405">Ciphertext: </strong> se ajusta al múltiplo de bloque AES (16 B) mediante PKCS#7.</li>
      <li data-start="2389" data-end="2481">Para un texto de 8Bytes («Hola Bob»), el resultante cifrado ocupa 16Bytes.</li>
      <li data-start="2482" data-end="2515"><strong data-start="2484" data-end="2491">Tag:</strong> es siempre 32Bytes porque HMAC-SHA-256 produce 256 bits.</li>
      </ul>
      <hr data-start="2517" data-end="2520" />
      <h3><strong>Paso 5:&nbsp;</strong>Paquete final enviado</h3>
      <div className="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary">
      <div className="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between h-9 bg-token-sidebar-surface-primary select-none rounded-t-2xl">&nbsp;</div>
      <div className="sticky top-9">&nbsp;</div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">┌── <span className="hljs-selector-tag">header</span> ─────────────────────────────────────────────────────────┐ </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">│&nbsp;DH_pub_A (<span className="hljs-number">32</span>Bytes) │ pn (32Bytes) │ n (32Bytes) │ &hellip; AD (opcional) │ └───────────────────────────────────────────────────────────────────┘ </code></div>
      <div className="overflow-y-auto p-4" dir="ltr">&nbsp;</div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">┌── <span className="hljs-selector-tag">body</span> ──────────────────────────────────────────────┐</code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">│&nbsp; &nbsp; ciphertext (AES-CBC, padded) │ tag (<span className="hljs-number">32</span>Bytes)&nbsp; &nbsp; &nbsp; │ </code></div>
      <div className="overflow-y-auto p-4" dir="ltr"><code className="whitespace-pre!">└──────────────────────────────────────────────────────┘ </code></div>
      </div>
      <p data-start="2884" data-end="3022"><strong data-start="2884" data-end="2909">Total para "Hola Bob"</strong> (8 B) &rArr;<br data-start="2917" data-end="2920" /> <code data-start="2920" data-end="2984">32Bytes DH + 8Bytes pn/n + 16Bytes cipherText + 32Bytes tag &asymp; 88 Bytes</code> (aprox.; pn/n codificados en varint "entero de longitud variable").</p>
      </ul>
    </div>
);


export const Paso4Doc: React.FC = () => (
    <div>
      <h1>¿Qué recibe Bob?</h1>
      <ul>
      <p data-start="139" data-end="172">Un paquete (vía <strong data-start="155" data-end="166">TLS 1.3</strong>) con:</p>
      <ul data-start="173" data-end="341">
      <li data-start="173" data-end="210">
      <p data-start="175" data-end="210"><code data-start="175" data-end="208">header = DH_pub_A ‖ pn ‖ n ‖ IV</code></p>
      </li>
      <li data-start="211" data-end="225">
      <p data-start="213" data-end="225"><code data-start="213" data-end="225">ciphertext</code></p>
      </li>
      <li data-start="226" data-end="247">
      <p data-start="228" data-end="247"><code data-start="228" data-end="233">tag</code> (HMAC-SHA256)</p>
      </li>
      <li data-start="248" data-end="341">
      <p data-start="250" data-end="341">(solo si es <strong data-start="262" data-end="281">pre-key message</strong> del primer contacto): <code data-start="304" data-end="341">IK_A_pub, EK_A_pub, id_SPK, id_OPK?</code></p>
      </li>
      </ul>
      </ul>      
      <hr />
      <h1><strong data-start="362" data-end="380">Primer mensaje</strong> (pre-key message, aún no hay sesión)</h1>
      <ul>
      <h2>1. Localiza sus claves</h2>
      <ul data-start="451" data-end="619">
      <li data-start="451" data-end="487">
      <p data-start="453" data-end="487"><code data-start="453" data-end="464">IK_B_priv</code> (privada, identidad)</p>
      </li>
      <li data-start="491" data-end="533">
      <p data-start="493" data-end="533"><code data-start="493" data-end="505">SPK_B_priv</code> (pre-key firmada vigente)</p>
      </li>
      <li data-start="537" data-end="619">
      <p data-start="539" data-end="619"><code data-start="539" data-end="552">OPK_B_priv?</code> (si el servidor asignó una; se marca como consumida una vez usada)</p>
      </li>
      </ul>


      <h2>2. Reconstruye el secreto X3DH (mismas DH que hizo Alice pero &ldquo;del otro lado&rdquo;):</h2>
      <ul>
      <p>DH1 = DH(SPK_B_priv , IK_A_pub)<br />
      DH2 = DH(IK_B_priv , EK_A_pub)<br />
      DH3 = DH(SPK_B_priv , EK_A_pub)<br />
      DH4 = DH(OPK_B_priv , EK_A_pub) # si vino OPK<br /><br />
      S = HKDF( DH1 ‖ DH2 ‖ DH3 (‖ DH4) )</p>
      </ul>
      <h2>3. Inicializa Double Ratchet</h2>
      <p>RK0, CK_recv0, CK_send0 = HKDF(S) # raíz y cadenas<br /><br />
      current_DH_B = (dhB_priv, dhB_pub) # par DH de Bob vigente</p>
      <h2>4. Deriva la clave de mensaje para el índice <code data-start="1112" data-end="1115">n</code> recibido</h2>
      <p><strong>MK = HKDF(CK_recv0) &rarr; mk_enc, mk_mac, IV_recv</strong><br /># Si n &gt; 0, se itera la cadena hasta n, guardando MKs &ldquo;saltadas&rdquo;.</p>
      <p>&nbsp;</p>
      <h2>5. Verifica integridad y descifra</h2>
      <p><strong>tag_check = HMAC-SHA256(mk_mac, header ‖ ciphertext)</strong><br />
      si tag_check != tag &rarr; DESCARTA<br />
      <strong>plaintext = AES-256-CTR(mk_enc, IV, ciphertext)</strong></p>
      <hr />
      <h4>El mensaje recibido se vería así:</h4>
      <p><span style={{color: "#bb2a2aff"}}>9689A050AE0C6849682236DCE99367C26E3A89C2D4629E0B23735101B6CB6B14</span><br />
        <span style={{color: "#0000ff"}}>00</span>
        <span style={{color: "#c49a10ff"}}>00</span>
        <span style={{color: "#2caf12ff"}}>D6A2F0206E8183E9B2A43F1247DCC4ED6F3EF467C32BED27</span>
        <span style={{color: "#00ccffff"}}>30D41FC77B65ADA7</span><br />
        <span style={{color: "#f700ffff"}}>258449FA4175BC496A83847FA424DF9096987E845D14BBF4A828B095D497130E</span><br />
        Mensaje completo (HEX) <br />
        [0000...0061]  (98 B)</p>
        <p>DH_pub_A (32B)<br />[0000...001F] <br />HEX: 9689A050AE0C6849682236DCE99367C26E3A89C2D4629E0B23735101B6CB6B14</p>
        <p>pn (varint) (1B)<br />[0020...0020]<br />HEX: 00</p>
        <p>n (varint) (1B)<br />[0021...0021]<br />HEX: 00</p>
        <p>IV (24B)<br />[0022...0039]<br />HEX: D6A2F0206E8183E9B2A43F1247DCC4ED6F3EF467C32BED27</p>
        <p>ciphertext (8B)<br />[003A...0041]<br />HEX: 30D41FC77B65ADA7</p>
        <p>tag (HMAC-SHA256) (32B)<br />[0042...0061]<br />HEX: 258449FA4175BC496A83847FA424DF9096987E845D14BBF4A828B095D497130E</p>


      </ul>
      </div>
);

export const Paso5Doc: React.FC = () => (
    <div>hola mundo, Paso 3</div>
);