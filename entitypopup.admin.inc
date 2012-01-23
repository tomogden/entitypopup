<?php
/**
 * @file
 * Configure the settings form for the entitypopup module.
 */

 /**
 * Form function, called by drupal_get_form()
 * in entitypopup_menu().
 */
function entitypopup_form($form, &$form_state) {
  $form['entitypopup_domains'] = array(
    '#type' => 'textfield',
    '#title' => t('Approved domains'),
    '#default_value' => variable_get('entitypopup_domains'),
    '#description' => t('Enter the email domains approved for entry, separated by commas.'),
    '#required' => TRUE,
  );

  $form['entitypopup_description'] = array(
    '#type' => 'textfield',
    '#title' => t('Mail field description'),
    '#default_value' => variable_get('entitypopup_description'),
    '#description' => t('Optionally, enter an custom description of what you want entered into the email field or the domains that will be approved. If left empty, the default description will be used.'),
    '#required' => FALSE,
  );

  return system_settings_form($form);
}

/**
 * Implements hook_form_alter().
 *
 */
function entitypopup_form_alterTEST(&$form, &$form_state, $form_id) {
  switch ($form_id) {
    case 'user_register_form':
      if (isset($form['account']) && is_array($form['account'])) {
        $form['account']['mail']['#title'] = t('E-mail');
      }
      else {
        $form['mail']['#title'] = t('E-mail');
      }
      break;
  }
}
