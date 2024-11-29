import React, { useState } from "react";

const Use = () => {
  const initialAdvisors = [
    { name: "Ana Pérez" },
    { name: "Juan López" },
    { name: "María García" },
  ];

  const administrators = [
    { name: "Diana Pérez" },
    { name: "Juancamilo López" },
  ];

  const [allAdvisors] = useState(initialAdvisors)
  const [selectedAdvisors, setSelectedAdvisors] = useState([]); 
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [assignedAdvisors, setAssignedAdvisors] = useState({});
  const [message, setMessage] = useState("");
  
  

  const handleAdvisorCheck = (e) => {
    const advisorName = e.target.value;
    if (e.target.checked) {
      setSelectedAdvisors([...selectedAdvisors, advisorName]);
    } else {
      setSelectedAdvisors(selectedAdvisors.filter((name) => name !== advisorName));
    }
  }


  const handleAdminSelect = (e) => {
    setSelectedAdmin(e.target.value);
  }

  const assignAdvisors = () => {
    if (!selectedAdmin || selectedAdvisors.length === 0) {
      alert("Selecciona al menos un asesor y un administrador.");
      return;
    }

    // Actualiza las asignaciones
    setAssignedAdvisors((prev) => {
      const updatedAssignments = { ...prev }; // copia del estado anterior 
      if (!updatedAssignments[selectedAdmin]) { // se verifica si adm ya tiene asesores 
        updatedAssignments[selectedAdmin] = []; // // Si no tiene, asignamos una lista vacía
      }
      // Paso 3: Combinamos los asesores ya asignados con los nuevos asesores seleccionados
      // Asegurándonos de que no haya duplicados usando "Set"
      updatedAssignments[selectedAdmin] = [
        ...new Set([...updatedAssignments[selectedAdmin], ...selectedAdvisors]),
      ];
      return updatedAssignments;
    });

    // Genera el mensaje
    const assignedMessage = selectedAdvisors
      .map((advisor) => `El usuario ${advisor} ha sido asignado de manera exitosa a ${selectedAdmin}.`)
      .join("\n");

    // Muestra el mensaje y limpia selecciones
    setMessage(assignedMessage);
    setTimeout(() => setMessage(""), 5000); // Elimina el mensaje después de 5 segundos
    setSelectedAdvisors([]);
    setSelectedAdmin("");
    setShowDropdown(false);
  };


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  return (
    <div>
      <h1>Asignación de Asesores a Administradores</h1>
      <button onClick={toggleDropdown}>selecciona asesorer</button>
      {showDropdown && (
        <div>
            {allAdvisors.map((advisor) => (
                <div key={advisor.name}>
                    <input
                        type="checkbox"
                        value={advisor.name}
                        checked={selectedAdvisors.includes(advisor.name)}
                        onChange={handleAdvisorCheck}
                    />
                     <label>{advisor.name}</label>
                </div>    
            ))}
        </div>
      )}
        <div>
        <label>Selecciona un administrador:</label>
        <select value={selectedAdmin} onChange={handleAdminSelect}>
          <option value="">-- Selecciona un administrador --</option>
          {administrators.map((admin) => (
            <option key={admin.name} 
                    value={admin.name}>
                    {admin.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={assignAdvisors}>Asignar Asesores</button>
      {message && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid green", color: "green" }}>
          <p>{message}</p>
        </div>
      )}

      
      
    </div>
    
  ) 
};

export default Use;

