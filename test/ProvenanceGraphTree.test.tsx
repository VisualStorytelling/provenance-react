import * as React from 'react'

import { shallow } from 'enzyme'
import { ProvenanceGraphTree } from '../src/ProvenanceGraphTree'
import { ProvenanceGraph, ActionFunctionRegistry, ProvenanceGraphTraverser } from '@visualstorytelling/provenance-core';

describe('ProvenanceGraphTree', () => {
    test('should render', () => {
        const registry = new ActionFunctionRegistry();
        const graph = new ProvenanceGraph({name:'test', version:'1.2.3'})
        const traverser = new ProvenanceGraphTraverser(registry, graph);

        const wrapper = shallow(<ProvenanceGraphTree traverser={traverser}/>)
    })
});