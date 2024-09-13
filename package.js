Package.describe({
    name: 'pwix:toggle-switch',
    version: '0.3.6-rc',
    summary: 'A toggle switch Blaze component',
    git: 'https://github.com/trychlos/pwix-toggle-switch',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.mainModule( 'src/client/js/index.js', 'client' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:toggle-switch' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    api.versionsFrom([ '2.9.0', '3.0-rc.0' ]);
    api.use( 'blaze-html-templates@2.0.0 || 3.0.0-alpha300.0', 'client' );
    api.use( 'ecmascript' );
    api.use( 'less@4.0.0', 'client' );
    api.addFiles( 'src/client/components/toggleSwitch/toggleSwitch.js', 'client' );
}
