# REGLAS DE NEGOCIO DEL SISTEMA STREAMHUB

## 1. Objetivo

Las reglas de negocio de StreamHub establecen las condiciones, restricciones y criterios que deberán cumplirse durante el funcionamiento de la plataforma. Su finalidad es mantener un control adecuado de los usuarios, grupos, solicitudes, suscripciones y aportaciones económicas, así como garantizar que los diferentes módulos trabajen de manera integrada.

## 2. Reglas de negocio generales

**RN-01. Registro de usuarios:** Toda persona que desee utilizar las funcionalidades que requieren una cuenta deberá registrarse en la plataforma.

**RN-02. Información única:** Cada usuario deberá contar con un identificador único y un correo electrónico que no esté registrado previamente.

**RN-03. Autenticación:** Las funcionalidades privadas de la plataforma solamente estarán disponibles para usuarios que hayan iniciado sesión.

**RN-04. Roles y permisos:** El sistema deberá distinguir entre usuarios y administradores, asignando a cada uno los permisos correspondientes.

**RN-05. Integridad de la información:** Los datos registrados deberán mantener consistencia entre los diferentes módulos del sistema.

**RN-06. Disponibilidad de plataformas:** Solamente podrán utilizarse las plataformas de streaming que estén registradas y habilitadas en el catálogo.

**RN-07. Control de operaciones:** Las operaciones que modifiquen información importante deberán validar que el usuario tenga autorización para realizarlas.

**RN-08. Estado de los registros:** Los registros que requieran seguimiento deberán contar con estados que permitan identificar su situación actual.

**RN-09. Protección de información:** Los datos personales y de acceso de los usuarios deberán manejarse de forma segura.

**RN-10. Compatibilidad:** La plataforma deberá permitir el acceso desde dispositivos de escritorio, tabletas y teléfonos móviles mediante una interfaz responsiva.

**RN-11. Pagos simulados:** Las operaciones económicas de StreamHub serán únicamente demostrativas. No se realizarán cobros ni transacciones bancarias reales.

**RN-12. Cumplimiento de condiciones:** El uso de la plataforma deberá respetar las condiciones de servicio y las políticas de las plataformas externas. StreamHub no almacenará contraseñas ni credenciales de cuentas externas de streaming.

---

## 3. Reglas de negocio por módulo

### Módulo 1. Inicio y catálogo de streaming

**RN-13. Consulta del catálogo:** Los usuarios podrán consultar las plataformas de streaming disponibles en el sistema.

**RN-14. Información de plataformas:** Cada plataforma deberá mostrar información como nombre, descripción, imagen y planes disponibles, según los datos registrados.

**RN-15. Búsqueda:** El usuario podrá buscar plataformas mediante su nombre.

**RN-16. Filtrado:** El catálogo permitirá filtrar las plataformas utilizando los criterios disponibles en el sistema.

**RN-17. Disponibilidad:** Las plataformas deshabilitadas por el administrador no deberán aparecer como opciones disponibles para crear nuevos grupos.

**RN-18. Información actualizada:** Los datos mostrados deberán corresponder con la información registrada en la base de datos o recuperada mediante la API externa seleccionada.

### Módulo 2. Grupos y suscripciones compartidas

**RN-19. Creación de grupos:** Los usuarios autenticados podrán crear grupos asociados a una plataforma y un plan disponible.

**RN-20. Datos obligatorios:** Todo grupo deberá contar con un nombre, plataforma, plan, capacidad de participantes y creador.

**RN-21. Capacidad máxima:** Un grupo no podrá aceptar más participantes de los permitidos por su capacidad configurada.

**RN-22. Participantes:** El creador del grupo será identificado como su responsable y podrá consultar la información de los participantes.

**RN-23. Estado del grupo:** Cada grupo deberá tener un estado que permita identificar si está disponible, completo, cerrado o cancelado.

**RN-24. Edición:** Solamente el creador o un administrador autorizado podrá modificar la información del grupo.

**RN-25. Cancelación:** Un grupo podrá cancelarse únicamente por su creador o por un administrador autorizado.

**RN-26. Cálculo de aportaciones:** El sistema podrá calcular la aportación estimada por participante utilizando el costo del plan y la cantidad de participantes definida.

### Módulo 3. Solicitudes y participantes

**RN-27. Envío de solicitudes:** Los usuarios autenticados podrán enviar solicitudes para integrarse a grupos disponibles.

**RN-28. Solicitud única:** Un usuario no podrá mantener varias solicitudes activas para el mismo grupo.

**RN-29. Validación de capacidad:** No se permitirá aprobar una solicitud cuando el grupo haya alcanzado su capacidad máxima.

**RN-30. Aprobación y rechazo:** El responsable del grupo podrá aprobar o rechazar las solicitudes recibidas.

**RN-31. Estados de solicitud:** Las solicitudes deberán manejar estados como pendiente, aprobada y rechazada.

**RN-32. Incorporación:** Cuando una solicitud sea aprobada, el usuario deberá incorporarse a la lista de participantes y se actualizará la ocupación del grupo.

**RN-33. Consulta:** Los usuarios podrán consultar el estado de sus solicitudes y los grupos en los que participan.

**RN-34. Notificaciones:** El sistema deberá informar al usuario cuando su solicitud cambie de estado.

### Módulo 4. Pagos y control de gastos

**RN-35. Registro de aportaciones:** El sistema permitirá registrar aportaciones simuladas relacionadas con los grupos en los que participa cada usuario.

**RN-36. Importe:** Cada aportación deberá estar asociada a un usuario, grupo, cantidad y fecha.

**RN-37. Estados de aportación:** Las aportaciones deberán manejar estados como pendiente, registrada y vencida, según corresponda.

**RN-38. Consulta de historial:** Los usuarios podrán consultar sus aportaciones y movimientos registrados.

**RN-39. Control de gastos:** El sistema permitirá consultar los importes asociados a los grupos para llevar un control informativo de las aportaciones.

**RN-40. Restricción de pagos:** Ninguna operación deberá interpretarse como un cobro real ni requerirá información bancaria.

**RN-41. Reportes:** El módulo podrá generar reportes de aportaciones y gastos registrados en la plataforma.

### Módulo 5. Usuarios y perfil personal

**RN-42. Consulta del perfil:** Cada usuario podrá consultar su información personal registrada.

**RN-43. Modificación de datos:** Los usuarios podrán actualizar los datos personales que el sistema permita modificar.

**RN-44. Privacidad:** Un usuario solamente podrá modificar su propio perfil, salvo las operaciones autorizadas para administradores.

**RN-45. Consulta de actividad:** El usuario podrá consultar sus grupos, solicitudes y aportaciones relacionadas con su cuenta.

**RN-46. Preferencias:** El sistema permitirá configurar las preferencias disponibles para la cuenta del usuario.

**RN-47. Cierre de sesión:** El usuario podrá cerrar su sesión para finalizar el acceso a las funcionalidades privadas.

**RN-48. Recuperación de acceso:** El sistema deberá contemplar un mecanismo para recuperar el acceso a la cuenta mediante un proceso de verificación.

### Módulo 6. Administración y estadísticas

**RN-49. Acceso administrativo:** Solamente los usuarios con rol de administrador podrán acceder al panel de administración.

**RN-50. Gestión de plataformas:** Los administradores podrán registrar, consultar, modificar y deshabilitar plataformas de streaming.

**RN-51. Gestión de planes:** Los administradores podrán administrar los planes y sus características, incluyendo sus costos informativos.

**RN-52. Gestión de usuarios:** Los administradores podrán consultar y gestionar las cuentas de usuario conforme a sus permisos.

**RN-53. Supervisión de grupos:** El administrador podrá consultar los grupos registrados y revisar su estado.

**RN-54. Estadísticas:** El sistema deberá presentar información estadística sobre usuarios, grupos, plataformas y aportaciones.

**RN-55. Reportes:** El administrador podrá consultar reportes generales sobre la actividad registrada en la plataforma.

**RN-56. Control administrativo:** Las modificaciones realizadas desde el panel administrativo deberán respetar las validaciones y restricciones generales del sistema.

---

## 4. Consideraciones generales

1. Las reglas de negocio deberán aplicarse en el backend para evitar que puedan omitirse mediante modificaciones desde la interfaz.
2. La base de datos deberá conservar la integridad de la información mediante relaciones y restricciones apropiadas.
3. Los estados de grupos, solicitudes y aportaciones deberán actualizarse de acuerdo con las operaciones realizadas.
4. Las funcionalidades que dependan de una API externa estarán sujetas a la disponibilidad y condiciones de dicha API.
5. Las reglas podrán ajustarse durante el desarrollo si se modifican los requerimientos del proyecto o se identifican nuevas necesidades.