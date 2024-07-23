import { usePalette } from "color-thief-react";
import chroma from "chroma-js";
import { useEffect, useState } from "react";

function ColorThief() {
  const [imgSrc, setImgSrc] = useState(null);
  const [colors, setColors] = useState([]);
  const [scaleColors, setScaleColors] = useState([]);

  const { data, loading, error } = usePalette(imgSrc, 4, "hex", { crossOrigin: "anonymous" });

  // Actualiza los colores cuando los datos cambien
  useEffect(() => {
    if (data) {
      setColors(data);
    }
  }, [data]);

  // Actualiza la escala de colores cuando los colores cambien
  useEffect(() => {
    if (colors.length > 0) {
      setScaleColors(getScale(colors));

    }
  }, [colors]);

  useEffect(() => {
    if (scaleColors.length > 0) {
      updateCssVariables(scaleColors)
    }
  }, [scaleColors]);

  const handleLoadImage = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setImgSrc(url);
  }

  const getScale = (colors) => {
    const colorsScales = colors.map((color) => {
      const scale = chroma.scale([color, "#ffffff"]).colors(10, "hex")
      const wantedScale = scale.slice(0, 8)
      return wantedScale
    })

    return colorsScales
  }

  const updateCssVariables = (colors) => {
    const root = document.documentElement;
    colors.flat().forEach((color, index) => {
      root.style.setProperty(`--color-${index}`, color);
    })
  }

  return (
    <div>
      <label htmlFor="image">subir imagen</label>
      <input type="file" name="image" onChange={handleLoadImage} />
      {scaleColors.flat().map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color }}
          className="w-8 h-8"
        ></div>
      ))}
    </div>
  )
}

export default ColorThief

