/*export interface Municipio {
  codigo_postal: string,
  municipio_id: string,
  municipio_nombre: string

}

export interface MunicipioResponse {
    results: Municipio[]
}*/

export interface GasolineraResponse {
    Fecha: string
    results: ListaEessprecio[]
    Nota: string
    ResultadoConsulta: string
}
export class Gasolinera {
    constructor(
      public id: number,
      public nombre: string,
      public price95: number,
      public priceDiesel: number,
      public postalCode: string,
     
     
    ) {}
  }

export interface ListaEessprecio {

    "C.P.": string
    Dirección: string
    Horario: string
    Latitud: string
    Localidad: string
    "Longitud (WGS84)": string
    Margen: string
    Municipio: string
    "Precio Biodiesel": string
    "Precio Bioetanol": string
    "Precio Gas Natural Comprimido": string
    "Precio Gas Natural Licuado": string
    "Precio Gases licuados del petróleo": string
    "Precio Gasoleo A": string
    "Precio Gasoleo B": string
    "Precio Gasoleo Premium": string
    "Precio Gasolina 95 E10": string
    "Precio Gasolina 95 E5": string
    "Precio Gasolina 95 E5 Premium": string
    "Precio Gasolina 98 E10": string
    "Precio Gasolina 98 E5": string
    "Precio Hidrogeno": string
    Provincia: string
    Remisión: string
    Rótulo: string
    "Tipo Venta": string
    "% BioEtanol": string
    "% Éster metílico": string
    IDEESS: string
    IDMunicipio: string
    IDProvincia: string
    IDCCAA: string
}
