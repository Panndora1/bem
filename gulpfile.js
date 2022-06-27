import gulp from 'gulp';
import { path } from './gulp/config/path.js';

global.app = {
    path: path,
    gulp: gulp,
}


import ghPages from 'gulp-gh-pages';

gulp.task('deploy', function () {
    return gulp.src("./dist/**/*")
      .pipe(deploy())
  });


//import tasks
import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { css } from './gulp/tasks/css.js'

//создаем наблюдателя
function wather() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.css, css);
}

const mainTasks = gulp.parallel(copy, html, css)

//Построение сценариев выполенеия задач
const dev = gulp.series(reset, mainTasks, wather)

//Выполнение по умолчанию
gulp.task('default', dev)