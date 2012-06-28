/*global Shape*/

'use strict';

var ShapeMaker = {

    getRandomShape : function () {
        return new Shape(this.tetramins[Math.floor(Math.random() * 7)]);
    },

    tetramins : [
        {
            id : "C",
            "color" : "#efefef",
            "coords" : [[0, 0], [-1, -1], [-1, 0], [0, -1]]
        },

        {
            id : "L",
            "color" : "#efefef",
            "coords" : [[0, 0], [0, -1], [0, 1], [1, 1]]
        },

        {
            id : "LI",
            "color" : "#efefef",
            "coords" : [[0, 0], [0, -1], [0, 1], [-1, 1]]
        },

        {
            id : "Z",
            "color" : "#efefef",
            "coords" : [[0, 0], [0, -1], [-1, -1], [1, 0]]
        },

        {
            id : "S",
            "color" : "#efefef",
            "coords" : [[0, 0], [-1, 0], [0, -1], [1, -1]]
        },

        {
            id : "T",
            "color" : "#efefef",
            "coords" : [[0, 0], [-1, 0], [0, -1], [1, 0]]
        },

        {
            id : "B",
            "color" : "#efefef",
            "coords" : [[-1, 0], [0, 0], [1, 0], [2, 0]]
        }
    ]
};
