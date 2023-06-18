# Configuraciones 

&nbsp;

## Ejecución y configuración (Windows 11)

&nbsp;

###  *1.- Instala el **jdk(Java Development Kit)** Posterior a la versión 8+*
- #### *Crea o edita la variable de entorno **JAVA_HOME** y agrega la ruta del jdk:*

```
C:\Program Files\Java\jdk-11
```
- #### *Crea o edita la variable de entorno **CLASSPATH** y agrega la siguiente ruta:*
```
C:\Program Files\Java\jdk-11\lib\tools.jar
```
> #### *Cambia el **jdk-11** por el nombre del jdk que tengas instalado en tu ruta*

&nbsp;

###  *2.- Instala **Android Studio** junto con el Android 13.0 Tiramisu (O cualquier otro sdk, Tiramisu es solo el recomendado)*
- #### *Crea la variable de entorno **ANDROID_HOME** y agrega la ruta del sdk:*

```
C:\x-user\AppData\Local\Android\Sdk
```
- #### *Edita la variable de entorno **PATH** y agrega la siguiente ruta:*
```
C:\Users\x-user\AppData\Local\Android\Sdk\platform-tools
```
> #### *Cambia el **x-user** por el nombre tu usuario de windows*
&nbsp;
###  *3.- Configura un dispositivo para emular en **Device Manager** del Android Studio y añade el sdk que has instalado en Android Studio*
- #### Una vez creado y configurado tu dispositivo ejecutalo
&nbsp;
### *4.- Intala el cli de **React Native** en tu cmd:*
```
npm install -g @react-native-community/cli
```
&nbsp;
### *5.- Dirígete al **directorio raíz** del repositorio desde cmd y ejecuta el siguiente comando:*
```
npm react-native start
```
- #### *Una vez ejecutado el comando presiona la letra **'a'** en el menú que aparece en la terminal*
    ```
    C:\x-user\Source\Ciispalma>npx react-native start

                        ▒▒▓▓▓▓▒▒
                     ▒▓▓▓▒▒░░▒▒▓▓▓▒
                  ▒▓▓▓▓░░░▒▒▒▒░░░▓▓▓▓▒
                 ▓▓▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▓▓
                 ▓▓░░░░░▒▓▓▓▓▓▓▒░░░░░▓▓
                 ▓▓░░▓▓▒░░░▒▒░░░▒▓▒░░▓▓
                 ▓▓░░▓▓▓▓▓▒▒▒▒▓▓▓▓▒░░▓▓
                 ▓▓░░▓▓▓▓▓▓▓▓▓▓▓▓▓▒░░▓▓
                 ▓▓▒░░▒▒▓▓▓▓▓▓▓▓▒░░░▒▓▓
                  ▒▓▓▓▒░░░▒▓▓▒░░░▒▓▓▓▒
                     ▒▓▓▓▒░░░░▒▓▓▓▒
                        ▒▒▓▓▓▓▒▒

                Welcome to Metro v0.73.10
              Fast - Scalable - Integrated

    r - reload the app
    d - open developer menu
    i - run on iOS
    a - run on Android
    ```
- #### *Si no te aparece el menú, entonces ejecuta:*
    ```
    npm react-native run-android
    ```