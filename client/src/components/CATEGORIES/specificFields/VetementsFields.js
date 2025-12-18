// VetementsField.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VetementsFields = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    marca: '',
    modelo: '',
    motor: '',
    price: '',
    provincia: '',
    ciudad: '',
    images: []
  });

  // Función para manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Avanzar al siguiente paso
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  // Retroceder al paso anterior
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí iría la llamada a tu API del backend (POST /api/products)
    // await axios.post('/api/products', formData);
    alert('¡Producto publicado!');
  };

  // Animación para el carrusel
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(0);

  const handleNavigation = (newStep) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  return (
    <div className="form-container">
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="form-step"
            >
              <h3>Paso 1: Información básica</h3>
              <input
                type="text"
                name="title"
                placeholder="Título del producto"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="form-step"
            >
              <h3>Paso 2: Detalles del vehículo</h3>
              <input
                type="text"
                name="marca"
                placeholder="Marca"
                value={formData.marca}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="modelo"
                placeholder="Modelo"
                value={formData.modelo}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="motor"
                placeholder="Motor (ej: 2.0L Turbo)"
                value={formData.motor}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Precio (€)"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="form-step"
            >
              <h3>Paso 3: Ubicación e imágenes</h3>
              <input
                type="text"
                name="provincia"
                placeholder="Provincia"
                value={formData.provincia}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
              />
              <div className="image-upload">
                <label>Subir imágenes:</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setFormData(prev => ({
                      ...prev,
                      images: files
                    }));
                  }}
                />
                {formData.images.length > 0 && (
                  <p>{formData.images.length} imagen(es) seleccionada(s)</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="form-buttons">
          {step > 1 && (
            <button type="button" onClick={() => handleNavigation(step - 1)}>
              ← Atrás
            </button>
          )}
          
          {step < 3 ? (
            <button type="button" onClick={() => handleNavigation(step + 1)}>
              Siguiente →
            </button>
          ) : (
            <button type="submit" className="submit-btn">
              Publicar Producto
            </button>
          )}
        </div>
      </form>

      <style jsx>{`
        .form-container {
          max-width: 500px;
          margin: 40px auto;
          padding: 30px;
          border: 1px solid #ddd;
          border-radius: 15px;
          background: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .progress-bar {
          height: 6px;
          background: #eee;
          border-radius: 3px;
          margin-bottom: 40px;
          overflow: hidden;
        }
        .progress {
          height: 100%;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          transition: width 0.4s ease;
        }
        .form-step {
          min-height: 300px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        h3 {
          color: #333;
          margin-bottom: 20px;
          font-size: 1.4rem;
        }
        input, textarea {
          padding: 14px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: border 0.3s;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: #4f46e5;
        }
        textarea {
          resize: vertical;
        }
        .image-upload {
          padding: 20px;
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          text-align: center;
        }
        .form-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          gap: 15px;
        }
        button {
          padding: 14px 28px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        button[type="button"] {
          background: #f3f4f6;
          color: #4b5563;
        }
        button[type="button"]:hover {
          background: #e5e7eb;
        }
        .submit-btn {
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          color: white;
          flex-grow: 1;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
        }
      `}</style>
    </div>
  );
};

export default VetementsFields;