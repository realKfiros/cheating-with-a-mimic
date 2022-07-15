import {useEffect, useRef} from 'react';
import './App.css';
import {Engine, Render, Runner, MouseConstraint, Mouse, Composite, Constraint, Bodies, World, Composites, Events, Body, Vector} from 'matter-js';
import {css} from "@emotion/react";

const styleGame = css`
`;
export const Game = () =>
{
	const boxRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() =>
	{
		const destroy = createGame();
		return () => destroy();
	}, []);

	const createGame = () =>
	{
		const engine = Engine.create({
			// enableSleeping: true
		} as any);
		const world = engine.world;

		// create renderer
		const render = Render.create({
			element: boxRef.current as any,
			engine: engine,
			canvas: canvasRef.current as any,
			options: {
				width: 800,
				height: 600,
				showAngleIndicator: false,
			}
		});

		Render.run(render);

		/**
		 * game logic
		 */

		// add mouse control
		const mouse = Mouse.create(render.canvas),
			mouseConstraint = MouseConstraint.create(engine, {
				mouse: mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false
					}
				} as any
			});

		Composite.add(world, mouseConstraint);

		// keep the mouse in sync with rendering
		render.mouse = mouse;

		// fit the render viewport to the scene
		Render.lookAt(render, {
			min: {x: 0, y: 0},
			max: {x: 800, y: 600}
		});

		return () =>
		{
			Render.stop(render);
			Engine.clear(engine);
			render.canvas.remove();
			(render as any).canvas = null;
			(render as any).context = null;
			render.textures = {};
		};
	}

	return <div ref={boxRef} css={styleGame}>
		<canvas ref={canvasRef}/>
	</div>;
};
