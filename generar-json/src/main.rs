use std::fs;
use std::path::Path;

fn main() {
    let carpeta: &str = "../src/img";
    let salida: &str = "../src/js/json/galeria.json";

    let extensiones: [&str; 4] = ["jpg", "jpeg", "png", "webp"];

    let mut fotos: Vec<String> = Vec::new();

    for entry in fs::read_dir(carpeta).expect("No se pudo leer la carpeta") {
        let entry = entry.expect("Error leyendo archivo");
        let path = entry.path();

        if let Some(ext) = path.extension() {
            let ext: String = ext.to_string_lossy().to_lowercase();

            if extensiones.contains(&ext.as_str()) {
                let nombre: String = path.file_name().unwrap().to_string_lossy().to_string();

                let anio: String =
                    if nombre.len() >= 4 && nombre[..4].chars().all(|c| c.is_numeric()) {
                        nombre[..4].to_string()
                    } else {
                        "sin anio".to_string()
                    };

                let alt = Path::new(&nombre)
                    .file_stem()
                    .unwrap()
                    .to_string_lossy()
                    .replace("_", " ")
                    .trim_start_matches(&format!("{} ", anio)) // elimina el año del inicio
                    .to_string();

                fotos.push(format!(
                    "  {{ \"src\": \"img/{}\", \"alt\": \"{}\", \"anio\": \"{}\" }}",
                    nombre, alt, anio
                ));
            }
        }
    }

    let json = format!("[\n{}\n]", fotos.join(",\n"));
    fs::write(salida, json).expect("No se pudo escribir el archivo");

    println!("{} fotos guardadas en {}", fotos.len(), salida);
}
