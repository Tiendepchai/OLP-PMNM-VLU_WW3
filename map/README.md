# LCDP-Map 🗺️

Một thư viện wrapper cho Leaflet, được tối ưu hóa để sử dụng trong Appsmith với các chức năng tùy chỉnh.

### GUIDE FOR BUILDING AND PUBLISHING LCDP-MAP

---

### 1. DIRECTORY STRUCTURE  
```
LCDP-MAP/
├── src/
│   └── index.js        # Main source code
├── dist/               # Build output
├── .gitignore          # Git ignore file
├── LICENSE             # MIT License
├── README.md           # Documentation
├── package.json        # Package config
└── webpack.config.js   # Webpack config
```

---

### 2. CHECK MAIN FILES
- **`package.json`**: Verify version and dependencies.  
- **`webpack.config.js`**: Ensure correct UMD configuration.  
- **`src/index.js`**: Check the code and exports.  
- **`README.md`**: Update documentation if necessary.  

---

### 3. BUILD AND PUBLISH COMMANDS
```bash
# Add and commit changes
git add .
git commit -m "Remove CSS import and add dynamic CSS loading"

# Increment version
npm version patch --force

# Build package
npm run build

# Push to GitHub
git push origin master --tags

# Publish to npm
npm publish
```

---

### 4. POST-PUBLISH CHECKS
- Verify the package on npm:  
  [https://www.npmjs.com/package/lcdp-map](https://www.npmjs.com/package/lcdp-map)  
- Check the CDN URL:  
  [https://cdn.jsdelivr.net/npm/lcdp-map@1.0.0/dist/index.umd.js](https://cdn.jsdelivr.net/npm/lcdp-map@1.0.0/dist/index.umd.js)  
- Test in Appsmith with the new URL.  

---

### 5. TROUBLESHOOTING
- **If `npm publish` fails**: Verify `npm login`.  
- **If `git push` fails**: Pull the latest changes before pushing.  
- **If the build fails**: Check webpack configuration and dependencies.  

---

### 6. IMPORTANT NOTES
- Always check the version before publishing.  
- Ensure thorough testing before pushing.  
- Update `README.md` with the new version.  
- Maintain a changelog to track updates.  

---

### END OF GUIDE