import React, { useState } from "react";
import axios from "axios";

interface StatsProps {
  average: number;
  isDiagonal: boolean;
  max: number;
  min: number;
  sum: number;
}

const App: React.FC = () => {
  const [matrixSize, setMatrixSize] = useState<number>(3);
  const [matrixInput, setMatrixInput] = useState<number[][]>([]);
  const [matrixRotate, setMatrixRotate] = useState<number[][] | null>(null);
  const [qMatrix, setQMatrix] = useState<number[][] | null>(null);
  const [rMatrix, setRMatrix] = useState<number[][] | null>(null);
  const [statsQ, setStatsQ] = useState<StatsProps | null>(null);
  const [statsR, setStatsR] = useState<StatsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createEmptyMatrix = (size: number): number[][] => {
    const matrix = [];
    for (let i = 0; i < size; i++) {
      const row = Array(size).fill(0);
      matrix.push(row);
    }
    return matrix;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
    const value = Number(e.target.value);
    const newMatrix = [...matrixInput];
    newMatrix[row][col] = value;
    setMatrixInput(newMatrix);
  };

  const sendMatrix = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_PORT_GO}/qr`, matrixInput);
      console.log("Respuesta del servidor:", response.data);

      const data = response.data;
      setMatrixRotate(data.RotatedMatrix);
      setQMatrix(data.QMatrix);
      setRMatrix(data.RMatrix);
      setStatsQ(data.QStats);
      setStatsR(data.RStats);
    } catch (error) {
      console.error("Error al procesar la matriz:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatMatrix = (matrix: number[][], readonly: boolean) => {
    return (
      <table style={tableStyle}>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                    style={inputStyle}
                    readOnly={readonly}  
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const formatStats = (stats: StatsProps) => {
    // console.log(stats.isDiagonal)
    return (
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td><strong>Promedio:</strong></td>
            <td>{stats.average.toFixed(4)}</td>
          </tr>
          <tr>
            <td><strong>¿Es diagonal?:</strong></td>
            <td>{stats.isDiagonal ? "Sí" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Máximo:</strong></td>
            <td>{stats.max.toFixed(4)}</td>
          </tr>
          <tr>
            <td><strong>Mínimo:</strong></td>
            <td>{stats.min.toFixed(4)}</td>
          </tr>
          <tr>
            <td><strong>Suma:</strong></td>
            <td>{stats.sum.toFixed(4)}</td>
          </tr>
        </tbody>
      </table>
    );
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    setMatrixSize(newSize);
    setMatrixInput(createEmptyMatrix(newSize));
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Factorización QR y Estadísticas de Matriz</h1>

      <div style={inputGroupStyle}>
        <label htmlFor="matrixSize" style={labelStyle}>Tamaño de la matriz (N x N):</label>
        <input
          id="matrixSize"
          type="number"
          min="2"
          value={matrixSize}
          onChange={handleSizeChange}
          style={inputStyle}
        />
      </div>

      <div>
        <h3 style={sectionHeadingStyle}>Ingresa la matriz:</h3>
        {formatMatrix(matrixInput, false)}
        <br />
        <button onClick={sendMatrix} disabled={loading} style={buttonStyle}>
          {loading ? "Cargando..." : "Enviar Matriz"}
        </button>
      </div>

      {loading && <p style={loadingTextStyle}>Cargando resultados...</p>}

      {matrixRotate && (
        <div style={matrixContainerStyle}>
          <h3 style={sectionHeadingStyle}>Matriz Rotada</h3>
          {formatMatrix(matrixRotate, true)}
        </div>
      )}

      {qMatrix && (
        <div style={matrixContainerStyle}>
          <h3 style={sectionHeadingStyle}>Matriz Q</h3>
          {formatMatrix(qMatrix, true)}
          <h3 style={sectionHeadingStyle}>Estadísticas de Q</h3>
          {statsQ && formatStats(statsQ)}
        </div>
      )}

      {rMatrix && (
        <div style={matrixContainerStyle}>
          <h3 style={sectionHeadingStyle}>Matriz R</h3>
          {formatMatrix(rMatrix, true)}
          <h3 style={sectionHeadingStyle}>Estadísticas de R</h3>
          {statsR && formatStats(statsR)}
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  padding: "30px",
  backgroundColor: "#181818",  // Fondo oscuro
  color: "#eaeaea",  // Texto claro
  borderRadius: "8px",
  maxWidth: "900px",
  margin: "0 auto",
  display: "block",  // Asegura que el contenedor sea un bloque y se centre
};

const headingStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#eaeaea",  // Texto claro
};

const inputGroupStyle: React.CSSProperties = {
  marginBottom: "20px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "16px",
  marginBottom: "8px",
  display: "block",
  color: "#ccc",  // Color más suave para las etiquetas
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "8px",
  border: "1px solid #555",  // Bordes más oscuros
  marginBottom: "20px",
  boxSizing: "border-box",
  backgroundColor: "#333",  // Fondo oscuro para inputs
  color: "#eaeaea",  // Texto claro en inputs
};

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#4CAF50",  // Verde brillante
  color: "white",
  border: "none",
  padding: "12px 24px",
  fontSize: "16px",
  borderRadius: "8px",
  cursor: "pointer",
  width: "100%",
  transition: "background-color 0.3s",
};

const loadingTextStyle: React.CSSProperties = {
  textAlign: "center",
  fontSize: "18px",
  color: "#bbb",  // Gris claro para el texto de carga
};

const sectionHeadingStyle: React.CSSProperties = {
  color: "#eaeaea",  // Texto claro para encabezados de secciones
  marginBottom: "10px",
};

const matrixContainerStyle: React.CSSProperties = {
  marginBottom: "40px",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "20px",
  color: "#eaeaea",  // Texto de la tabla claro
  backgroundColor: "#222",  // Fondo oscuro para la tabla
};



export default App;
