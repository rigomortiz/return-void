import ReactTypingEffect from 'react-typing-effect';

const Manifest = () =>  {

    return (
        <div style={{top: '25%', left: '25%',  position: 'absolute', width:'50%', right: '25%'}}>
            {/*<ReactTypingEffect
                text={[
                    "Manifiesto",
                    "Void                0.",
                    "Informational       1xx. Has llegado a la ruta sin retorno, tú decides si descargas la última actualización a tu ser. new Enlightenment();",
                    "Success             2xx. Has logrado la meta, pero no te detengas, sigue avanzando. new Enlightenment();",
                    "Redirection         3xx. Has sido redirigido a una nueva ruta, pero no te detengas, sigue avanzando. new Enlightenment();",,
                    "Client Error        4xx. Has cometido un error, pero no te detengas, sigue avanzando. new Enlightenment();",
                    "Server Error        5xx. Has cometido un error, pero no te detengas, sigue avanzando. new Enlightenment();",
                ]}
            />

            <br />*/}

            <ReactTypingEffect
                text={[
                    "Manifiesto",
                    "Void                0.",
                    "Informational       1xx. Has llegado a la ruta sin retorno, tú decides si descargas la última actualización a tu ser. new Enlightenment();",
                    "Success             2xx. Has logrado la meta, pero no te detengas, sigue avanzando. new Enlightenment();",
                    "Redirection         3xx. Has sido redirigido a una nueva ruta, pero no te detengas, sigue avanzando. new Enlightenment();",,
                    "Client Error        4xx. Has cometido un error, pero no te detengas, sigue avanzando. new Enlightenment();",
                    "Server Error        5xx. Has cometido un error, pero no te detengas, sigue avanzando. new Enlightenment();",
                ]}
                cursorRenderer={cursor => <h1>{cursor}</h1>}
                displayTextRenderer={(text, i) => {
                    return (
                        <h1>
                            {text.split('').map((char, i) => {
                                const key = `${i}`;
                                return (
                                    <span
                                        key={key}
                                        style={{color: '#00FF41', fontSize: '1.5rem', fontFamily: 'monospace', fontWeight: 'normal'}}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </h1>
                    );
                }}
                speed={100}
                eraseSpeed={50}
                eraseDelay={100}
            />
        </div>
    );
}

export default Manifest;
