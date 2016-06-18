// Node modules
var fs = require('fs'), vm = require('vm'), merge = require('deeply'), chalk = require('chalk'), es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'), autoprefixer = require('gulp-autoprefixer'), rjs = require('gulp-requirejs-bundler'), concat = require('gulp-concat'), clean = require('gulp-clean'), minifycss = require('gulp-minify-css'), rename = require('gulp-rename'), replace = require('gulp-replace'), uglify = require('gulp-uglify'), util = require("gulp-util"), htmlreplace = require('gulp-html-replace'), sass = require("gulp-sass"), log = util.log;

var gulpsync = require('gulp-sync')(gulp);

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'bower_modules/requirejs/require'
        },
        include: [
            'requireLib',
            'pages/home-page/home',
            'components/home-page-components/below-the-fold/about/about',
            'components/home-page-components/below-the-fold/app/app',
            'components/home-page-components/below-the-fold/corporateinfo/corporateinfo',
            'components/home-page-components/below-the-fold/features/features',
            'components/home-page-components/below-the-fold/pricing/pricing',
            'components/404/404',
            'components/home-page-components/register/register',
            'components/home-page-components/register/reg-fb/reg-fb',
            'components/home-page-components/register/reg-tw/reg-tw',
            'components/home-page-components/register/reg-em/reg-em',
            'components/home-page-components/login/login',
            'pages/update-user/update-user',
            'pages/forgotpw/forgotpw',
            'pages/corporateinfo/us',
            'pages/corporateinfo/sidebar/corpsidebar',
            'pages/corporateinfo/information/information',
            'pages/corporateinfo/media/media',
            'pages/corporateinfo/partner/partner',
            'pages/corporateinfo/support/support',
            'pages/corporateinfo/terms/terms',
            'pages/data-context/data-context',
            'components/nav-bar/nav-bar',
            'components/nav-bar/logo-badge/logo-badge',
            'components/notifications/notifications',
            'pages/my-notifications/my-notifications',
            'components/promo-campaign/promo-campaign',
            'components/weapon-related/create-ammo/create-ammo',
            'components/weapon-related/create-new-weapon-form/create-new-weapon-form',
            'components/weapon-related/create-weapon/create-weapon',
            'components/weapon-related/weapon-data-input/weapon-data-input',
            'components/weapon-related/weapon-selection-list/weapon-selection-list',
            'components/weapon-related/weapons-form/weapons-form',
            'components/prompt-create-post/prompt-create-post',
            'pages/post-a-hunt/post-a-hunt',
            'pages/post-a-hunt/initialize-hunt-post/initialize-hunt-post',
            'pages/post-a-hunt/update-hunt-post/update-hunt-post',
            'components/post-related/post-selector/post-selector',
            'components/update-hunt/input-animal-details/input-animal-details',
            'components/update-hunt/input-geo-solunar/input-geo-solunar',
            'components/update-hunt/input-weapon/input-weapon',
            'components/update-hunt/input-journal/input-journal',
            'components/update-hunt/input-friends/input-friends',
            'components/update-hunt/input-geo-solunar/post-geolocation/post-geolocation',
            'components/update-hunt/input-geo-solunar/need-location/need-location',
            'components/post-related/post/post',
            'pages/post-feed/post-feed',
            'pages/detailed-post/detailed-post',
            'components/post-related/critter-detail/critter-detail',
            'components/post-related/comment-related/create-comment/create-comment',
            'components/post-related/comment-related/comment/comment',
            'components/post-related/comment-related/comments-feed/comments-feed',
            'components/post-related/like-related/add-like/add-like',
            'components/post-related/like-related/like-card/like-card',
            'components/post-related/like-related/likes-feed/likes-feed',
            'components/follow-related/follower/follower',
            'components/follow-related/followees/followees',
            'components/follow-related/follow-button/follow-button',
            'components/user-related/account-settings/account-settings',
            'components/user-related/update-user-component/update-user-component',
            'components/user-related/account-privacy/account-privacy',
            'components/user-related/account-billing/account-billing',
            'components/user-related/delete-account/delete-account',
            'pages/user-profile/user-profile',
            'components/user-profile/user-info/user-info',
            'components/user-profile/user-trophies/user-trophies',
            'components/user-profile/user-clubs/user-clubs',
            'components/user-profile/user-likes/user-likes',
            'components/user-profile/user-followers/user-followers',
            'components/user-profile/user-following/user-following',
            'components/user-profile/user-rank/user-rank',
            'components/user-profile/user-weapons/user-weapons',
            'pages/user-settings/user-settings',
            'components/user-profile/user-feed/user-feed',
            'components/featured/featured-users-feed/featured-users-feed',
            'components/featured/featured-user-card/featured-user-card',
            'components/prompt-build-your-feed/prompt-build-your-feed',
            'components/featured/featured-posts-feed/featured-posts-feed',
            'components/featured/featured-post/featured-post',
            'components/points-related/trophy/trophy',
            'components/points-related/detailed-trophy/detailed-trophy',
            'components/points-related/top-shot/top-shot',
            'components/points-related/trophy-case/trophy-case',
            'components/club-profile/club/club',
            'components/club-profile/create-club/create-club',
            'components/club-profile/request-to-join/request-to-join',
            'components/club-profile/club-members/member/member',
            'pages/club-profile/club-profile',
            'components/club-profile/club-info/club-info',
            'components/club-profile/club-details/club-details',
            'components/club-profile/club-feed/club-feed',
            'components/club-profile/club-members/club-members',
            'components/club-profile/club-followers/club-followers',
            'components/club-profile/club-settings/club-settings',
            'components/club-profile/invite-users/invite-users',
            'components/club-profile/approve-users/approve-users',
            'components/club-profile/disable-club/disable-club',
            'components/featured/featured-clubs-feed/featured-clubs-feed',
            'components/featured/featured-club-card/featured-club-card',
            'components/search-related/explore-search-bar/explore-search-bar',
            'pages/explore/explore',
            'components/search-related/browse-by-posts/browse-by-posts',
            'components/search-related/browse-by-users/browse-by-users',
            'components/search-related/browse-by-groups/browse-by-groups',
            'components/modals/modal-window/modal-window',
            'components/modals/verify-shell/verify-shell',
            'components/dropdown/dropdown',
            'components/form-components/checkbox/checkbox',
            'components/form-components/radio-button-group-input/radio-button-group-input',
            'components/notification/notification',
            'components/photo-carousel/photo-carousel',
            'components/dropzone-photo-uploader/dropzone-photo-uploader',
            'components/heatmap/heatmap',
            'pages/testpage/testpage',
            'components/animal-form/animal-form',
            'components/form-components/numeric-input/numeric-input',
            'components/tooltip/tooltip',
            'components/sidebar-action-items/sidebar-action-items',
            'components/bs-datetime/bs-datetime',
            'components/weather-details/weather-details',
            'components/editable-label/editable-label',
            'components/icon/icon',
            'components/icon-selector/icon-selector',
            'components/img-with-callback/img-with-callback',
            'pages/insights-page/insights-page',
            'pages/gear-page/gear-page',
            'pages/preview-post-unauth/preview-post-unauth',
            'components/caption-input/caption-input',
            'components/tag-user-card/tag-user-card',
            'components/successful-post/successful-post',
            'components/user-weapon-tag/user-weapon-tag',

            'components/user-profile/gear/gear',

            'components/error-handler/error-handler',

            'components/weapon-related/weapon-user-list/weapon-user-list',

            // [Scaffolded component registrations will be inserted here. To retain this feature, don't remove this comment.]

        ],
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', function () {
    var bowerCss = gulp.src('src/bower_modules/components-bootstrap/css/bootstrap.min.css')
            .pipe(replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src('src/css/post-processed/*.css'),
        libCss = gulp.src('lib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css'),
        combinedCss = es.concat(bowerCss, appCss, libCss).pipe(concat('css.css')),
        fontFiles = gulp.src('./src/bower_modules/components-bootstrap/fonts/*', { base: './src/bower_modules/components-bootstrap/' });
    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('./dist/css/compiled'));
});

//move fonts folder
gulp.task('fonts', function () {
    return gulp.src('./src/fonts/**/*').pipe(gulp.dest('./dist/css/fonts'));
});

//move images folder
gulp.task('images', function () {
    return gulp.src('./src/images/**/*').pipe(gulp.dest('./dist/images'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'css': 'css/compiled/css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', gulpsync.sync(['clean','html', 'js', 'sass', 'css', 'fonts', 'images']), function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});

//ATTEMPTING TO USE SASS
gulp.task("sass", function(){ 
	log("Generate CSS files " + (new Date()).toString());
    gulp.src('./src/css/styles.scss')
		.pipe(sass({ style: 'expanded' }))
	    .pipe(autoprefixer("last 3 version","safari 5", "ie 8", "ie 9"))
		.pipe(gulp.dest("./src/css/post-processed"))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./src/css/post-processed'));
});

gulp.task("watch", function(){
	log("Watching scss files for modifications");
	gulp.watch(['./src/css/*.scss'], ["sass"]);
});

gulp.task("dev", gulpsync.sync(['sass','watch']), function(callback) {
    callback();
    console.log('Running Gulp SASS, then WATCH')
});
