// Drawer.js - VERSIÓN SIMPLIFICADA
import Offcanvas from 'react-bootstrap/Offcanvas';

function Drawer({ 
  show, 
  onHide, 
  title = "Menú", 
  children,
  width = 250,           // Solo ancho
  height = '100vh'       // Solo altura
}) {
  
  return (
    <Offcanvas 
      show={show} 
      onHide={onHide} 
      placement="start"
      style={{
        width: width,     // Ancho personalizado
        height: height    // Altura personalizada
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body style={{ overflowY: 'auto' }}>
        {children || (
          <div>
            <p>Contenido del menú lateral</p>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Drawer;