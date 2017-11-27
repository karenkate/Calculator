/**
 * All credits to: https://github.com/component/audio
 * Simple HTML5 <audio> tag
 * Used with base64 encoded string as source for audio
 * Usage: 
 *     var AudioTag = require('./pat_to_this_file');
 *     <AudioTag src={your_base64_string} />
 */

'use strict';
var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            audio: new Audio(this.props.src),
            isPlaying: false
        };
    },

    componentDidMount: function() {
        this.state.audio.addEventListener('timeupdate', this.ontimeupdate);
    },

    ontimeupdate: function() {

        var el = this.state.audio;
        var number = el.currentTime / el.duration * 100;

        this.update(number);

        if (number === 100) {
            return this.setState({
                isPlaying: false
            });
        }
    },

    toggle: function(event) {
        event.preventDefault();
        var state = this.state.audio;
        var isPlaying = this.state.isPlaying;

        this.setState({
            isPlaying: !isPlaying
        });

        if (isPlaying) {
            return state.pause();
        }
        return state.play();
    },

    update: function(progress) {
        var context = this.refs.manager.getDOMNode().getContext('2d');

        var percent = Math.min(progress, 100);
        var ratio = window.devicePixelRatio || 1;

        var size = this.refs.manager.getDOMNode().width / ratio;
        var half = size / 2;
        var x = half;
        var y = half;
        var rad = half - 1;

        var angle = Math.PI * 2 * (percent / 100);
        context.clearRect(0, 0, size, size);

        context.strokeStyle = '#00bbff';
        context.beginPath();
        context.arc(x, y, rad, 0, angle, false);
        context.stroke();
    },

    render: function() {
        var className = this.state.isPlaying ? 'audio playing' : 'audio paused';

        return React.DOM.div({
            className: className
        }, [
            React.DOM.a({
                href: '#',
                onClick: this.toggle,
                className: 'audio-play'
            }),
            React.DOM.canvas({
                width: 57,
                height: 57,
                ref: 'manager',
                size: 53
            })
        ]);
    }
});
