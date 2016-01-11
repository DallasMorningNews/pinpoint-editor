var gulp = require('gulp'),
    confirm = require('gulp-confirm'),
    shell = require('shelljs');


////////////////////////////
/// Deploy Tasks

gulp.task('commit-deploy', function(){
    return gulp.src('./*')
      .pipe(confirm({
              question: 'You\'re about to deploy to the server. Be sure you\'ve committed your changes. Are you sure you\'re ready?',
              input: '_key:y'
            }));
});

gulp.task('commit-serve', function(){
    return gulp.src('./*')
      .pipe(confirm({
              question: 'You\'re about to serve your site. Be sure you\'ve already deployed your code. Are you sure you\'re ready?',
              input: '_key:y'
            }));
});

gulp.task('commit-pull', function(){
    return gulp.src('./*')
      .pipe(confirm({
              question: 'You\'re about to pull your site from the server. Are you sure?',
              input: '_key:y'
            }));
});

gulp.task('deploy-prod', ['commit-deploy'] ,function(){
  console.log("*************************************");
  console.log("RUNNING PRODUCTION SERVER DEPLOYMENT");
  console.log("*************************************");
  shell.exec('./deploy/send_prod.sh');
});

gulp.task('deploy-test', ['commit-deploy'] ,function(){
  console.log("*************************************");
  console.log("Running test server deployment");
  console.log("*************************************");
  shell.exec('./deploy/send_test.sh');
});

gulp.task('serve-prod', ['commit-serve'] ,function(){
  console.log("*************************************");
  console.log("SERVING APP ON PRODUCTION SERVER");
  console.log("*************************************");
  shell.exec('./deploy/serve_prod.sh');
});

gulp.task('serve-test', ['commit-serve'] ,function(){
  console.log("*************************************");
  console.log("Serving app on test server");
  console.log("*************************************");
  shell.exec('./deploy/serve_test.sh');
});

gulp.task('pull-prod', ['commit-pull'], function(){
  console.log("*************************************");
  console.log("PULLING APP FROM PRODUCTION SERVER");
  console.log("*************************************");
  shell.exec('./deploy/pull_prod.sh');
});

gulp.task('pull-test', ['commit-pull'], function(){
  console.log("*************************************");
  console.log("Pulling app from test server");
  console.log("*************************************");
  shell.exec('./deploy/pull_test.sh');
});
