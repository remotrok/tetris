/*global Shape*/

'use strict';

var ShapeMaker = {

    getRandomShape : function () {
        return new Shape(this.tetramins[Math.floor(Math.random() * 7)]);
    },

    tetramins : [
        {
            id : "C",
            "color" : "yellow",
            "coords" : [[0, 0], [-1, -1], [-1, 0], [0, -1]]
        },

        {
            id : "L",
            "color" : "orange",
            "coords" : [[0, 0], [0, -1], [0, 1], [1, 1]]
        },

        {
            id : "LI",
            "color" : "blue",
            "coords" : [[0, 0], [0, -1], [0, 1], [-1, 1]]
        },

        {
            id : "Z",
            "color" : "red",
            "coords" : [[0, 0], [0, -1], [-1, -1], [1, 0]]
        },

        {
            id : "S",
            "color" : "green",
            "coords" : [[0, 0], [-1, 0], [0, -1], [1, -1]]
        },

        {
            id : "T",
            "color" : "purple",
            "coords" : [[0, 0], [-1, 0], [0, -1], [1, 0]]
        },

        {
            id : "B",
            "color" : "cyan",
            "coords" : [[0, -1], [0, 0], [0, 1], [0, 2]]
        }
    ]
};
