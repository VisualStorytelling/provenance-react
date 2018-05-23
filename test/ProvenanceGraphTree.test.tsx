import * as React from 'react'

import { shallow } from 'enzyme'
import { ProvenanceGraphTree } from '../src/ProvenanceGraphTree'
import { ProvenanceGraph, ActionFunctionRegistry, ProvenanceGraphTraverser, IProvenanceGraphTraverser, IProvenanceGraph, IActionFunctionRegistry } from '@visualstorytelling/provenance-core';

describe('ProvenanceGraphTree', () => {
    let registry : IActionFunctionRegistry;
    let graph: IProvenanceGraph;
    let traverser : IProvenanceGraphTraverser

    beforeEach(() => {
        registry = new ActionFunctionRegistry();
        graph = new ProvenanceGraph({name:'test', version:'1.2.3'})
        traverser = new ProvenanceGraphTraverser(registry, graph);
    })

    test('should render', () => {
        shallow(<ProvenanceGraphTree traverser={traverser}/>)
    })

    describe('componentDidMount()', () => {
        let spy;
        let tree: ProvenanceGraphTree

        beforeEach(() => {
            spy = spyOn(graph, 'on')
            tree = new ProvenanceGraphTree({traverser});
            tree.componentDidMount();
        })

        it('should subscribe to changes to graph', () => {
            expect(spy).toBeCalledWith('nodeAdded', expect.any(Function));
            expect(spy).toBeCalledWith('currentChanged', expect.any(Function));
            expect(spy).toBeCalledWith('nodeChanged', expect.any(Function));
        })
    })

    describe('componentWillUnmount()', () => {
        let spy;
        let tree: ProvenanceGraphTree

        beforeEach(() => {
            spy = spyOn(graph, 'off')
            tree = new ProvenanceGraphTree({traverser});
            tree.componentWillUnmount();
        })

        it('should unsubscribe to changes to graph', () => {
            expect(spy).toBeCalledWith('nodeAdded', expect.any(Function));
            expect(spy).toBeCalledWith('currentChanged', expect.any(Function));
            expect(spy).toBeCalledWith('nodeChanged', expect.any(Function));
        })
    })

    describe('onGraphChange()', () => {
        let spy
        let tree: ProvenanceGraphTree

        beforeEach(() => {
            tree = new ProvenanceGraphTree({traverser});
            spy = spyOn(tree, 'forceUpdate')
        })

        it('should call forceUpdate', () => {
            tree.onGraphChange();

            expect(spy).toBeCalled()
        })
    })

    describe('onClick()', () => {
        let mock
        let spy
        let tree: ProvenanceGraphTree

        beforeEach(() => {
            tree = new ProvenanceGraphTree({traverser})
            mock =  jest.fn(() => Promise.resolve())
            traverser.toStateNode = mock
            spy = spyOn(tree, 'forceUpdate')

            return tree.onClick('some-id')
        })

        it('should call traverser.toStateNode', () => {
            expect(mock).toBeCalledWith('some-id')
        })

        it('should call forceUpdate', () => {
            expect(spy).toBeCalled()
        })
    })
})