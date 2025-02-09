using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace JuegoMemoria_Test
{
    public partial class _Default : Page
    {
        // Variables para mantener el estado del juego
        private static List<int> cartasVolteadas = new List<int>();
        private static List<int> cartasParejas = new List<int>();
        private static bool bloqueaTablero = false;

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        // Método para guardar el estado en Session
        [WebMethod]
        public static void ActualizarEstado(string estadoJuego)
        {
            var js = new System.Web.Script.Serialization.JavaScriptSerializer();
            var estado = js.Deserialize<EstadoJuego>(estadoJuego);

            // Guardar el estado en Session
            HttpContext.Current.Session["cartasVolteadas"] = estado.CartasVolteadas;
            HttpContext.Current.Session["cartasParejas"] = estado.CartasParejas;
            HttpContext.Current.Session["bloqueaTablero"] = estado.BloqueaTablero;
        }

        // Método para recuperar el estado desde Session
        [WebMethod]
        public static string ObtenerEstado()
        {
            var estadoJuego = new EstadoJuego
            {
                CartasVolteadas = HttpContext.Current.Session["cartasVolteadas"] as List<int>,
                CartasParejas = HttpContext.Current.Session["cartasParejas"] as List<int>,
                BloqueaTablero = (bool?)HttpContext.Current.Session["bloqueaTablero"] ?? false
            };

            var js = new System.Web.Script.Serialization.JavaScriptSerializer();
            return js.Serialize(estadoJuego);
        }

        // Método para reiniciar el juego
        [WebMethod]
        public static void ReiniciarJuego()
        {
            HttpContext.Current.Session["cartasVolteadas"] = new List<int>();
            HttpContext.Current.Session["cartasParejas"] = new List<int>();
            HttpContext.Current.Session["bloqueaTablero"] = false;
        }

        // Clase para almacenar el estado
        public class EstadoJuego
        {
            public List<int> CartasVolteadas { get; set; }
            public List<int> CartasParejas { get; set; }
            public bool BloqueaTablero { get; set; }
        }
    }
}