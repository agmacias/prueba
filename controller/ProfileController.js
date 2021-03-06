// si no le añadimos módulos adicionales irá sin corchetes
app.controller('ProfileController', ['$scope','$http','$uibModal', function($scope,$http,$uibModal) {
        $scope.init = function(){
            // cargamos el combo de paises
            $http.post("../dao/service/PaisesService.php", angular.toJson({}))
            .then(function(respuesta){
                    /*
                        Esto se ejecuta si todo va bien. Podemos leer la respuesta
                        que nos dio el servidor accediendo a la propiedad data
                        Recordemos que tenemos que decodificarla, ya que si enviamos con JSON
                        deben respondernos con JSON (no es obligatorio, pero sí es una buena práctica)
                */
                    console.log("Petición terminada. La respuesta es: ", angular.fromJson(respuesta.data));

                    $scope.data={
                        paises: respuesta.data
                    };

                    $scope.getProfileData();

              });
        }

        $scope.getProfileData=function(){
            var datos = {
                opcion:4
            }
            // cargamos el combo de paises
            $http.post("../dao/service/UsuarioService.php", angular.toJson(datos))
            .then(function(respuesta){
                    /*
                        Esto se ejecuta si todo va bien. Podemos leer la respuesta
                        que nos dio el servidor accediendo a la propiedad data
                        Recordemos que tenemos que decodificarla, ya que si enviamos con JSON
                        deben respondernos con JSON (no es obligatorio, pero sí es una buena práctica)
                */
                    console.log("Petición terminada. La respuesta es: ", angular.fromJson(respuesta.data));

                    $scope.profileView={
                        id: respuesta.data.id,
                        nombre:respuesta.data.nombre,
                        apellido1:respuesta.data.apellido1,
                        apellido2:respuesta.data.apellido2,
                        nacimiento:respuesta.data.f_nacimiento,
                        pais:respuesta.data.pais,
                        telefono:respuesta.data.telefono,
                        direccion:respuesta.data.direccion,
                        mail:respuesta.data.mail,
                        contrasena : respuesta.data.password,
                        usuario : respuesta.data.usuario
                    }
                    

              });
        }

        $scope.sendProfileForm = function() {
            if($scope.profileView.contrasena==$scope.profileView.contrasena2){
                var updateData = {
                    opcion:3, // modificación del perfil de usuario
                    id: $scope.profileView.id,
                    usuario: $scope.profileView.usuario,
                    nombre: $scope.profileView.nombre,
                    apellido1: $scope.profileView.apellido1,
                    apellido2: $scope.profileView.apellido2,
                    nacimiento: $scope.profileView.nacimiento,
                    pais: $scope.profileView.pais,
                    telefono: $scope.profileView.telefono,
                    direccion: $scope.profileView.direccion,
                    email: $scope.profileView.mail,
                    contrasenia: $scope.profileView.contrasena
                };

            $http.post("../dao/service/UsuarioService.php", angular.toJson(updateData))
            .then(function(respuesta){
                    /*
                        Esto se ejecuta si todo va bien. Podemos leer la respuesta
                        que nos dio el servidor accediendo a la propiedad data
                        Recordemos que tenemos que decodificarla, ya que si enviamos con JSON
                        deben respondernos con JSON (no es obligatorio, pero sí es una buena práctica)
                */
                    console.log("Petición terminada. La respuesta es: ", angular.fromJson(respuesta.data));

                    if(respuesta.data.response==true){
                        $scope.abrirVentanaModalOk(respuesta.data.mensaje);
                    }else{
                        $scope.abrirVentanaModalKo(respuesta.data.mensaje);
                    }
              });
            }
        };

        $scope.abrirVentanaModalOk = function(message){
            $scope.params = {"title":"Perfil","message":message};

            $uibModal.open({
              scope: $scope,
              templateUrl: '../php/modal/sucessModal.html',
              resolve: {
                params: function() {
                  return $scope.params;
                }
              }
            });
        }

        $scope.abrirVentanaModalKo = function(message){
            $scope.params = {"title":"Perfil","message":message};

            $uibModal.open({
              scope: $scope,
              templateUrl: '../php/modal/errorModal.html',
              resolve: {
                params: function() {
                  return $scope.params;
                }
              }
            });
        }

 }]);

