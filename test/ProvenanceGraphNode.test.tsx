import * as React from 'react'

import { shallow } from 'enzyme'
import { ProvenanceGraphNode } from '../src/ProvenanceGraphNode'
import { ProvenanceNode, ProvenanceGraph, IProvenanceGraph, StateNode } from '@visualstorytelling/provenance-core'

describe('ProvenanceGraphNode', () => {
    let onClick
    let graph: IProvenanceGraph

    beforeEach(() => {
        onClick = jest.fn()
        graph = new ProvenanceGraph({name:'test', version:'1.2.3'})
    })

    describe('single root node + node === current', () => {
        let wrapper

        beforeEach(() => {
            const current = graph.current
            const node = current
            wrapper = shallow(<ProvenanceGraphNode node={node} onClick={onClick} current={current} />)
        })

        test('should render', ()=> {
            expect(wrapper).toBeTruthy();
        })

        describe('click on node', () => {
            beforeEach(() => {
                wrapper.find('button').simulate('click');
            })

            test('should call onClick function', () => {
                expect(onClick).toBeCalledWith(graph.current.id)
            })
        })
    })

    describe('graph with 2 nodes', () => {
        let node2: StateNode
        beforeEach(() => {
            node2 = {
                id: 'some id',
                label: 'some label',
                metadata: {
                    createdBy: 'Someone',
                    createdOn: 1234
                },
                children: [],
                action: {
                    do: 'do',
                    doArguments: [],
                    undo: 'undo',
                    undoArguments: []
                },
                actionResult: undefined,
                artifacts: {},
                parent: graph.root
            }
            graph.addNode(node2);
            graph.root.children.push(node2);
        })

        describe('node !== current', () => {
            test('should render', ()=> {
                const current = graph.current
                shallow(<ProvenanceGraphNode node={node2} onClick={onClick} current={current} />)
            })
        })

        describe('node with child', () => {
            test('should render', ()=> {
                const current = graph.current
                const node = current
                shallow(<ProvenanceGraphNode node={node} onClick={onClick} current={current} />)
            })
        })
    })
})