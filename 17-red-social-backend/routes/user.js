const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserContoller = require("../controllers/user");
const check = require("../middlewares/auth");

// Configuracion de subida
const storage = multer.diskStorage({    //es una libreria de nodeJS que sirve para que cuando te envian un archivo que necesitas guardar, define en donde guardarlo
    destination: (req, file, cb) => {  // podria estar en el middleware ya que se mete en el medio de las rutas y los endpoints
        cb(null, "./uploads/avatars/")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar-"+Date.now()+"-"+file.originalname);
    }
});

const uploads = multer({storage});

// Definir rutas
router.get("/prueba-usuario", check.auth, UserContoller.pruebaUser);
router.post("/register", UserContoller.register);
router.post("/login", UserContoller.login);
router.get("/profile/:id", check.auth, UserContoller.profile);
router.get("/list/:page?", check.auth, UserContoller.list);
router.put("/update", check.auth, UserContoller.update);
router.post("/upload", [check.auth, uploads.single("file0")], UserContoller.upload);
router.get("/avatar/:file", UserContoller.avatar); // cambio
router.get("/counters/:id", check.auth, UserContoller.counters);

// Exportar router
module.exports = router;