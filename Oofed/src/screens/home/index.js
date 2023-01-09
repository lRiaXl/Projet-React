import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// Composant affichant la page de connexion et d'inscription
const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Bienvenue sur Oofed</Text>
      {/* Champ de saisie pour l'adresse email */}
      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {/* Champ de saisie pour le mot de passe */}
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {/* Espace entre les champs de saisie et les boutons */}
      <View style={{height: 20}} />
      {/* Bouton de connexion */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      {/* Espace entre les boutons */}
      <View style={{height: 20}} />
      {/* Bouton d'inscription */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles de la page
const styles = StyleSheet.create({
  // Conteneur global
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Titre
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  // Champ de saisie
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    borderRadius: 5,
    color: '#000',
  },
  // Bouton
  button: {
    backgroundColor: '#000',
    padding: 15,
    width: '80%',
    borderRadius: 5,
  },
  // Texte du bouton
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
