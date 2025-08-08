export const Paso3Doc: React.FC = () => (
<div>
<h1>¿Qué recibe Bob?</h1>
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
<hr />
<h1><strong data-start="362" data-end="380">Primer mensaje</strong> (pre-key message, aún no hay sesión)</h1>
<ol data-start="419" data-end="704">
<li data-start="419" data-end="619">
<h2 data-start="422" data-end="447"><strong data-start="422" data-end="445">Localiza sus claves</strong></h2>
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
</li>
<li data-start="621" data-end="704">
<h2 data-start="624" data-end="704"><strong data-start="624" data-end="655">Reconstruye el secreto X3DH</strong> (mismas DH que hizo Alice pero &ldquo;del otro lado&rdquo;):</h2>
</li>
</ol>
<p>DH1 = DH(SPK_B_priv , IK_A_pub)<br />DH2 = DH(IK_B_priv , EK_A_pub)<br />DH3 = DH(SPK_B_priv , EK_A_pub)<br />DH4 = DH(OPK_B_priv , EK_A_pub) # si vino OPK<br />S = HKDF( DH1 ‖ DH2 ‖ DH3 (‖ DH4) )</p>
<h2>3. Inicializa Double Ratchet</h2>
<p>RK0, CK_recv0, CK_send0 = HKDF(S) # raíz y cadenas<br />current_DH_B = (dhB_priv, dhB_pub) # par DH de Bob vigente</p>
<p>&nbsp;</p>
<h2>4. Deriva la clave de mensaje para el índice <code data-start="1112" data-end="1115">n</code> recibido</h2>
<p>MK = HKDF(CK_recv0) &rarr; mk_enc, mk_mac, IV_recv<br /># Si n &gt; 0, se itera la cadena hasta n, guardando MKs &ldquo;saltadas&rdquo;.</p>
<p>&nbsp;</p>
<h2>5. Verifica integridad y descifra</h2>
<p>tag_check = HMAC-SHA256(mk_mac, header ‖ ciphertext)<br />si tag_check != tag &rarr; DESCARTA<br />plaintext = AES-256-CTR(mk_enc, IV, ciphertext)</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
</div>
)