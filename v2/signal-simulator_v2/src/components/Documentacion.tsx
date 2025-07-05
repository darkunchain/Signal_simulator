import React from "react";

export const PasoInDoc: React.FC = () => (
  <div>
    <h4>¿Qué ocurre en el paso inicial?</h4>
    <ul>
      <li>
        <b>IK_A</b>: Llave de identidad de Alice <span style={{ color: "red" }}>🔑 privada</span>.
      </li>
      <li>
        <b>IK_B</b>: Llave de identidad de Bob <span style={{ color: "blue" }}>🔑 pública</span>.
      </li>
      <li>
        <b>SPK_B</b>: Llave de sesión de Bob <span style={{ color: "blue" }}>🔑 pública</span>.
      </li>
    </ul>
    <p>
      <i>Nota:</i> Aquí puedes escribir toda la documentación que quieras, incluir <a href="#">enlaces</a> o imágenes.
    </p>
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
