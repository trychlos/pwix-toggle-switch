/*
 * pwix:toggle-switch/src/client/components/toggleSwitch/toggleSwitch.js
 *
 * A CSS toggle switch
 * from https://www.w3schools.com/howto/howto_css_switch.asp
 *
 * Parms:
 * - see README
 */

import { Random } from 'meteor/random';
import { ReactiveVar } from 'meteor/reactive-var';

import './toggleSwitch.html';
import './toggleSwitch.less';

Template.toggleSwitch.onCreated( function(){
    const self = this;

    self.TS = {
        // arguments
        name: new ReactiveVar( '' ),
        labelTop: new ReactiveVar( '' ),
        labelRight: new ReactiveVar( '' ),
        labelBottom: new ReactiveVar( '' ),
        labelLeft: new ReactiveVar( '' ),
        title: new ReactiveVar( '' ),
        state: new ReactiveVar( true ),
        enabled: new ReactiveVar( true ),
        id: null,

        // get a bool arg if present
        argBool( name ){
            if( Object.keys( Template.currentData()).includes( name )){
                const b = Template.currentData()[name];
                if( b === true || b === false ){
                    self.TS[name].set( b );
                } else if( b === 'true' || b === 'false' ){
                    self.TS[name].set( b === 'true' );
                } else {
                    console.warn( 'toggleSwitch expects \''+name+'\' be a boolean, found', b );
                }
            }
        },

        // get a string arg if present
        argString( name ){
            if( Object.keys( Template.currentData()).includes( name )){
                const s = Template.currentData()[name];
                if( s ){
                    if( typeof s === 'string' || s instanceof String ){
                        self.TS[name].set( s );
                    } else {
                        console.warn( 'toggleSwitch expects \''+name+'\' be a string, found', s );
                    }
                }
            }
        }
    };

    // get arguments
    self.autorun(() => {
        self.TS.argString( 'name' );
        self.TS.argString( 'labelTop' );
        self.TS.argString( 'labelRight' );
        self.TS.argString( 'labelBottom' );
        self.TS.argString( 'labelLeft' );
        self.TS.argString( 'title' );
        self.TS.argBool( 'state' );
        self.TS.argBool( 'enabled' );
        //console.log( 'state='+self.TS.state.get(), 'enabled='+self.TS.enabled.get());
    });
});

Template.toggleSwitch.onRendered( function(){
    const self = this;

    // set the initial state
    self.autorun(() => {
        self.$( '.ts-switch input' ).prop( 'checked', self.TS.state.get());
    });

    // publish the state on changes
    self.autorun(() => {
        const state = self.TS.state.get();
        self.$( '.toggleSwitch' ).trigger( 'ts-state', {
            name: self.TS.name.get(),
            state: state
        });
    });
});

Template.toggleSwitch.helpers({
    enabled(){
        const TS = Template.instance().TS;
        return TS.enabled.get() ? '' : 'disabled';
    },

    // generate a unique id for the switch, thus associating label and input
    id(){
        const TS = Template.instance().TS;
        if( !TS.id ){
            TS.id = Random.id();
        }
        return TS.id;
    },

    label( name ){
        const TS = Template.instance().TS;
        return TS[name].get();
    }
});

Template.toggleSwitch.events({
    'click .ts-switch input'( event, instance ){
        const checked = instance.$( event.currentTarget ).prop( 'checked' );
        //console.debug( 'checked', checked );
        instance.TS.state.set( checked );
    },

    'click .ts-switch .ts-slider'( event, instance ){
        instance.$( event.currentTarget ).closest( '.ts-switch' ).find( 'input' ).click();
    },

    'ts-request .toggleSwitch'( event, instance ){
        instance.$( event.currentTarget ).trigger( 'ts-answer', {
            name: self.TS.name.get(),
            state: instance.TS.state.get(),
            enabled: instance.TS.enabled.get()
        });
    }
});
