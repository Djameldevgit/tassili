// SurfaceField.jsx - Campo compartido para superficie
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const SurfaceField = ({ postData, handleChangeInput, isRTL }) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label className={isRTL ? 'text-end d-block' : ''}>
        📏 {t('surface', 'Superficie')}
      </Form.Label>
      <Row>
        <Col>
          <Form.Control
            type="number"
            name="surface"
            value={postData.surface || ''}
            onChange={handleChangeInput}
            placeholder={t('enter_surface', 'Ex: 120')}
            min="0"
            step="0.01"
          />
        </Col>
        <Col>
          <Form.Select
            name="surfaceUnite"
            value={postData.surfaceUnite || 'm²'}
            onChange={handleChangeInput}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="m²">m²</option>
            <option value="ha">{t('hectares', 'Hectares')}</option>
            <option value="are">{t('ares', 'Ares')}</option>
            <option value="sqft">sq ft</option>
          </Form.Select>
        </Col>
      </Row>
      <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
        💡 {t('surface_tip', 'Surface habitable totale')}
      </Form.Text>
    </Form.Group>
  );
};

export default SurfaceField;