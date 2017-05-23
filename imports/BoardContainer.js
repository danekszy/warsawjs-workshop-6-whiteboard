import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import fabricObjects from '../lib/fabric-objects';
import Board from './Board';

export default BoardContainer = createContainer(({ isDrawingMode, session }) => {
    const objectSubscription = Meteor.subscribe('fabricObjects');
    return {
        objectSubscription,
        fabricObjectsCursor: fabricObjects.find(),
        isDrawingMode,
        session
    };
}, Board);
