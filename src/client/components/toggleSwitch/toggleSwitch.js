/*
 * pwix:toggle-switch/src/client/components/toggleSwitch/toggleSwitch.js
 *
 * A CSS toggle switch
 * from https://www.w3schools.com/howto/howto_css_switch.asp
 *
 * Parms:
 * - labelTop: a (HTML) string to be displayed above the switch, defaulting to none
 * - labelRight: a (HTML) string to be displayed on the right of the switch, defaulting to none
 * - labelBottom: a (HTML) string to be displayed below the switch, defaulting to none
 * - labelLeft: a (HTML) string to be displayed on the left of the switch, defaulting to none
 * - title: a label as the button title, defaulting to none
 * - state: whether the switch is initially on or off, defaulting to on
 * - enabled: whether the switch is enabled, defaulting to true
 */

import { ReactiveVar } from 'meteor/reactive-var';

import './toggleSwitch.html';
import './toggleSwitch.less';

Template.toggleSwitch.onCreated( function(){
    const self = this;

    self.TS = {
        // arguments
        labelTop: new ReactiveVar( '' ),
        labelRight: new ReactiveVar( '' ),
        labelBottom: new ReactiveVar( '' ),
        labelLeft: new ReactiveVar( '' ),
        title: new ReactiveVar( '' ),
        state: new ReactiveVar( true ),
        enabled: new ReactiveVar( true ),

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
        self.TS.argString( 'labelTop' );
        self.TS.argString( 'labelRight' );
        self.TS.argString( 'labelBottom' );
        self.TS.argString( 'labelLeft' );
        self.TS.argString( 'title' );
        self.TS.argBool( 'state' );
        self.TS.argBool( 'enabled' );
    });
});

Template.toggleSwitch.onRendered( function(){
    const self = this;

    // set the initial state
    self.autorun(() => {
        self.$( 'label.switch input' ).prop( 'checked', self.TS.state.get());
    });

    // publish the state on changes
    self.autorun(() => {
        self.$( 'toggleSwitch' ).trigger( 'ts-state', { state: self.TS.state.get() });
    });
});

Template.toggleSwitch.helpers({
    enabled(){
        const TS = Template.instance().TS;
        return TS.enabled.get() ? '' : 'disabled';
    },

    label( name ){
        const TS = Template.instance().TS;
        return TS[name].get();
    }
});

Template.toggleSwitch.events({
    'click label.switch input'( event, instance ){
        const checked = instance.$( event.currentTarget ).prop( 'checked' );
        instance.TS.state.set( checked );
    },

    'ts-request .toggleSwitch'( event, instance ){
        instance.$( event.currentTarget ).trigger( 'ts-answer', { state: instance.TS.state.get(), enabled: instance.TS.enabled.get() });
    }
});
