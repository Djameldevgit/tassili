import React, { useState } from 'react'
import {
  Card,
  Button,
  ProgressBar,
  Alert,
  Row,
  Col,
  Spinner
} from 'react-bootstrap'
import Step1Categories from './Step1Categories'
import Step2Duration from './Step2Duration'
import Step3Plan from './Step3Plan'
import { useDispatch, useSelector } from 'react-redux'
  import { createStore } from '../../redux/actions/storeAction'
 
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

const StoreWizard = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [storeData, setStoreData] = useState({
    categories: [],
    duration: 1,
    plan: null
  })
  const [localError, setLocalError] = useState(null)

  const dispatch = useDispatch()
  
  // Obtener estados de Redux
  const { auth } = useSelector(state => state)
  const { loading, error, success } = useSelector(state => state.store || {})
  
  console.log('🔄 Estado auth:', auth)
  console.log('🔄 Estado store:', { loading, error, success })

  const steps = ['Choisir catégories', 'Choisir durée', 'Choisir offre']
  const stepProgress = ((activeStep + 1) / steps.length) * 100

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1)
    setLocalError(null)
  }

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1)
    setLocalError(null)
  }

  const handleCategorySelect = (categories) => {
    console.log('✅ Catégories sélectionnées:', categories)
    setStoreData({ ...storeData, categories })
    setLocalError(null)
  }

  const handleDurationSelect = (duration) => {
    console.log('✅ Durée sélectionnée:', duration)
    setStoreData({ ...storeData, duration })
    setLocalError(null)
  }

  const handlePlanSelect = (plan) => {
    console.log('✅ Plan sélectionné:', plan)
    setStoreData({ ...storeData, plan })
    setLocalError(null)
  }

  const handleSubmit = async () => {
    console.log('🎯 === CLIC SUR CRÉER BOUTIQUE ===')
    console.log('📦 Données de la boutique:', storeData)
    console.log('🔑 Auth:', auth)
    
    // Resetear errores
    setLocalError(null)
    
    // Validations
    if (!storeData.plan) {
      const errorMsg = '❌ Veuillez sélectionner un plan'
      setLocalError(errorMsg)
      console.error('Erreur: Aucun plan sélectionné')
      
      // También mostrar alerta global
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: errorMsg }
      })
      return
    }
    
    if (storeData.categories.length === 0) {
      const errorMsg = '❌ Veuillez sélectionner au moins une catégorie'
      setLocalError(errorMsg)
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: errorMsg }
      })
      return
    }
    
    if (storeData.duration < 1) {
      const errorMsg = '❌ Durée invalide'
      setLocalError(errorMsg)
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: errorMsg }
      })
      return
    }

    // Verificar autenticación
    if (!auth || !auth.token) {
      const errorMsg = '❌ Vous devez être connecté pour créer une boutique'
      setLocalError(errorMsg)
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { 
          error: errorMsg,
          redirect: '/login'
        }
      })
      
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
      return
    }

    // Preparar datos para enviar
    const finalData = {
      name: `Boutique ${storeData.plan.name}`,
      description: `Boutique spécialisée en ${storeData.categories.join(', ')}`,
      categories: storeData.categories,
      category: storeData.categories[0], // Para el backend
      duration: storeData.duration,
      plan: storeData.plan.id.includes('basic') ? 'Free' : 
            storeData.plan.id.includes('silver') ? 'Pro' : 'Premium',
      price: storeData.plan.price * storeData.duration,
      originalPlan: storeData.plan.name,
      credits: storeData.plan.credits || 0,
      storage: storeData.plan.storage || 100
    }
    
    console.log('📤 Données finales à envoyer:', finalData)
    console.log('👤 User auth:', auth.user)
    
    try {
      // Dispatch de l'action avec la nueva estructura
      console.log('🔄 Dispatching createStore action...')
      
      const result = await dispatch(createStore({
        storeData: finalData,
        auth: {
          token: auth.token,
          user: auth.user
        }
      }))
      
      console.log('✅ Action createStore terminée:', result)
      
      // Mostrar mensaje de éxito
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { 
          success: result?.msg || 'Boutique créée avec succès! 🎉'
        }
      })
      
      // Redirigir si se creó correctamente
      if (result?.store?._id) {
        setTimeout(() => {
          window.location.href = `/store/${result.store._id}/dashboard`
        }, 2000)
      } else {
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      }
      
    } catch (error) {
      console.error('❌ Erreur dans handleSubmit:', error)
      setLocalError(error.message || 'Erreur lors de la création')
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Step1Categories 
            selectedCategories={storeData.categories}
            onSelect={handleCategorySelect}
          />
        )
      case 1:
        return (
          <Step2Duration 
            selectedDuration={storeData.duration}
            onSelect={handleDurationSelect}
          />
        )
      case 2:
        return (
          <Step3Plan 
            selectedPlan={storeData.plan}
            onSelect={handlePlanSelect}
            duration={storeData.duration}
          />
        )
      default:
        return 'Étape inconnue'
    }
  }

  const isStepValid = () => {
    switch (activeStep) {
      case 0: 
        const catValid = storeData.categories.length > 0
        console.log('✅ Validation catégories:', catValid, storeData.categories)
        return catValid
      case 1: 
        const durValid = storeData.duration > 0
        console.log('✅ Validation durée:', durValid, storeData.duration)
        return durValid
      case 2: 
        const planValid = storeData.plan !== null
        console.log('✅ Validation plan:', planValid, storeData.plan)
        return planValid
      default: return false
    }
  }

  // Mostrar error de Redux o local
  const displayError = error || localError

  console.log('🎨 Render StoreWizard:', {
    activeStep,
    isStepValid: isStepValid(),
    loading,
    displayError,
    authUser: auth?.user?.email
  })

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-muted">Étape {activeStep + 1} sur {steps.length}</span>
            <span className="text-primary fw-bold">{steps[activeStep]}</span>
          </div>
          <ProgressBar 
            now={stepProgress} 
            variant="primary" 
            className="mb-3"
            style={{ height: '6px' }}
          />
        </div>

        {/* Success Alert */}
        {success && (
          <Alert variant="success" className="mb-4">
            <i className="fas fa-check-circle me-2"></i>
            Boutique créée avec succès! Redirection en cours...
          </Alert>
        )}

        {/* Error Alert */}
        {displayError && (
          <Alert variant="danger" className="mb-4">
            <i className="fas fa-exclamation-circle me-2"></i>
            {displayError}
          </Alert>
        )}

        {/* Auth Status Warning */}
        {!auth?.token && (
          <Alert variant="warning" className="mb-4">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Vous devez être connecté pour créer une boutique. 
            <Button 
              variant="link" 
              className="p-0 ms-2"
              onClick={() => window.location.href = '/login'}
            >
              Se connecter
            </Button>
          </Alert>
        )}

        {/* Step Content */}
        <div className="my-4">
          {getStepContent(activeStep)}
        </div>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4 pt-3 border-top">
          <Button
            variant="outline-secondary"
            onClick={handleBack}
            disabled={activeStep === 0 || loading}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Retour
          </Button>
          
          <div>
            {activeStep === steps.length - 1 ? (
              <Button
                id="create-store-btn"
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                disabled={!isStepValid() || loading || !auth?.token}
                style={{ minWidth: '200px' }}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Création en cours...
                  </>
                ) : (
                  <>
                    <i className="fas fa-store me-2"></i>
                    {!auth?.token ? 'Connexion requise' : 'Créer la boutique'}
                  </>
                )}
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                Continuer
                <i className="fas fa-arrow-right ms-2"></i>
              </Button>
            )}
          </div>
        </div>

        {/* Debug Info (solo en développement) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4">
            <Alert variant="info" className="small">
              <strong>🔍 Debug Info:</strong>
              <div className="mt-2">
                <Row>
                  <Col md={6}>
                    <div><strong>État UI:</strong></div>
                    <div>• Step: {activeStep}</div>
                    <div>• Step Valid: {isStepValid().toString()}</div>
                    <div>• Loading: {loading?.toString() || 'false'}</div>
                    <div>• Auth: {auth?.token ? '✅ Connecté' : '❌ Non connecté'}</div>
                  </Col>
                  <Col md={6}>
                    <div><strong>Données boutique:</strong></div>
                    <div>• Catégories: {storeData.categories.length}</div>
                    <div>• Durée: {storeData.duration} mois</div>
                    <div>• Plan: {storeData.plan?.name || 'Aucun'}</div>
                    <div>• Plan ID: {storeData.plan?.id || '-'}</div>
                  </Col>
                </Row>
              </div>
            </Alert>
            
            {/* Botón para testear sin formulario */}
            <div className="text-center mt-3">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  // Datos de prueba
                  const testData = {
                    name: 'Boutique Test',
                    description: 'Boutique de test',
                    category: 'Electronique',
                    plan: 'Free',
                    duration: 1,
                    price: 0
                  }
                  
                  if (auth?.token) {
                    dispatch(createStore({
                      storeData: testData,
                      auth: {
                        token: auth.token,
                        user: auth.user
                      }
                    }))
                  } else {
                    alert('Connectez-vous d\'abord')
                  }
                }}
              >
                Tester création (debug)
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default StoreWizard