# 🔍 Débogage - Quiz qui n'apparaissent pas

## 🎯 Problème
Les quiz n'apparaissent plus sur la page `http://localhost:4201/quiz`

## 🔧 Étapes de Débogage

### **1. Vérifier la Console du Navigateur**
1. **Ouvrez** `http://localhost:4201/quiz`
2. **Appuyez** sur F12 pour ouvrir les outils de développement
3. **Allez** dans l'onglet "Console"
4. **Cherchez** les erreurs en rouge

### **2. Vérifier les Logs de Chargement**
Dans la console, vous devriez voir :
```
Erreur lors du chargement des catégories: ...
Erreur lors du chargement des sessions de questions: ...
```

### **3. Vérifier les Données**
Dans la console, tapez :
```javascript
// Vérifier les catégories
console.log('Catégories:', window.quizComponent?.categories);

// Vérifier les sessions
console.log('Sessions:', window.quizComponent?.questionSessions);
```

### **4. Vérifier le localStorage**
Dans la console, tapez :
```javascript
// Vérifier le localStorage
console.log('localStorage:', Object.keys(localStorage));
```

## 🐛 Problèmes Possibles

### **Problème 1 : Erreur de Réseau**
- **Symptôme** : Erreurs 404, 500, ou timeout dans la console
- **Solution** : Vérifier que l'API backend fonctionne

### **Problème 2 : Erreur de Données**
- **Symptôme** : `questionSessions` est vide ou null
- **Solution** : Vérifier l'API `/question-sessions`

### **Problème 3 : Erreur de Compilation**
- **Symptôme** : Erreurs TypeScript dans la console
- **Solution** : Vérifier les erreurs de compilation

### **Problème 4 : Problème de Filtrage**
- **Symptôme** : Les données existent mais ne s'affichent pas
- **Solution** : Vérifier la méthode `getSessionQuestionByCategoryType`

## 📋 Checklist de Vérification

- [ ] **Console** : Pas d'erreurs en rouge
- [ ] **Réseau** : Les requêtes API réussissent
- [ ] **Données** : `questionSessions` contient des données
- [ ] **Filtrage** : `getSessionQuestionByCategoryType` retourne des résultats
- [ ] **Template** : Les conditions `*ngFor` sont correctes

## 🚀 Solutions Rapides

### **Solution 1 : Recharger la Page**
1. **Appuyez** sur Ctrl+F5 (rechargement forcé)
2. **Vérifiez** si les quiz apparaissent

### **Solution 2 : Vider le Cache**
1. **Ouvrez** F12 > Application > Storage
2. **Cliquez** sur "Clear storage"
3. **Rechargez** la page

### **Solution 3 : Vérifier l'API**
1. **Ouvrez** `http://localhost:4201/api/question-sessions`
2. **Vérifiez** que l'API retourne des données

## 📞 Feedback

Dites-moi ce que vous voyez dans la console :
- ❌ Y a-t-il des erreurs en rouge ?
- ✅ Y a-t-il des logs de chargement ?
- ❓ Que contient `questionSessions` ?

Cela m'aidera à identifier le problème exact ! 🔍
