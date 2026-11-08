# Guía de colaboración

## Límites de cambios

- Cada compañero modifica únicamente los archivos HTML y CSS del componente que le asignaron dentro de `src/app/components/<componente>/`.
- Luis mantiene todo `src/app/components/perfil/`, todos los archivos TypeScript (`*.ts`), `src/app/app.*`, `src/app/app.routes.ts`, la configuración y los estilos compartidos.
- `src/app/components/navbar/` es compartido y solo lo modifica Luis.
- Si una tarea necesita cambiar archivos fuera del componente asignado, se coordina con Luis antes de editar.

## Preparar una copia limpia

En la carpeta anterior, primero revisen los cambios y si la rama tiene commits que todavía no se han subido:

```bash
git status --short --branch
git branch -vv
```

Respalden fuera del proyecto los archivos HTML y CSS de su componente asignado. Si hay commits locales sin subir, súbanlos a una rama propia o consérvenlos antes de borrar. Después pueden borrar la carpeta vieja y clonar el repositorio limpio, una vez que Luis haya terminado el merge y el pull request a `main` esté integrado:

```bash
git clone --branch main --single-branch https://github.com/ednadelgado-commits/StreamHub.git StreamHub
cd StreamHub
npm ci
git switch -c feature/grupos-tarjetas
```

Luego copien los archivos respaldados al componente correspondiente, revisen que solo cambió su módulo, y ejecuten `npm start` y `npm run build`. La copia limpia elimina las ramas locales antiguas. Las ramas remotas no se borran ni afectan esta rama nueva; no las eliminen hasta confirmar que sus cambios ya se integraron.

## Empezar una tarea

Antes de crear una rama, actualicen la base y asegúrense de no tener cambios sin guardar:

```bash
git status --short
git switch main
git pull --ff-only origin main
git switch -c feature/grupos-tarjetas
```

Cambien `grupos-tarjetas` por el componente y el trabajo asignado, por ejemplo `feature/finanzas-resumen` o `feature/admin-tabla`.

## Guardar y subir los cambios

Antes del commit, revisen qué modificaron y compilen la aplicación:

```bash
git status --short
git diff
npm run build
```

Agreguen solo los archivos asignados. Por ejemplo, para Grupos:

```bash
git add src/app/components/grupos/grupos.html src/app/components/grupos/grupos.css
git diff --cached
git commit -m "feat(grupos): agregar tarjetas de suscripciones"
git push -u origin feature/grupos-tarjetas
```

Después abran un pull request hacia `main` y esperen la revisión. No hagan commits directamente en la rama base ni usen `git add .`.

## Después de integrar el pull request

Actualicen la rama base y creen una rama nueva para la siguiente tarea:

```bash
git switch main
git pull --ff-only origin main
git switch -c feature/<componente>-<tarea>
```

No hagan `pull` con cambios locales sin guardar y no usen `git push --force` en ramas compartidas. GitHub debe tener habilitada la revisión obligatoria de pull requests para que el flujo de aprobación quede protegido por el repositorio.
