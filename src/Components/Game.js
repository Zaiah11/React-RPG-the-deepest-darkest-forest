import React, { Component } from 'react';
import {isaiah, matt} from "../Game/character";
import GameStates from "../Game/GameStates";
import Trainer from "../Game/Trainer";
import BattleScreen from "./BattleScreen"

class Game extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            player: new Trainer("Player",[
                new isaiah(45)
            ]),
            enemy: new Trainer("Garry",[
                new matt(50)
            ]),
            state: GameStates.IDLE 
        }

        this.state.playercharacters = this.state.player.getcharacters(0);
        this.state.enemycharacters = this.state.enemy.getcharacters(0);
    }

    setPlayercharacters(index) {
        this.setState((prevState) => ({
            playercharacters: prevState.player.getcharacters(index)
        }))
    }

    setEnemycharacters(index) {
        this.setState((prevState) => ({ 
            enemycharacters: prevState.enemy.getcharacters(index)
        }))
    }
    

    setGameState(gameState)
    {
        this.setState({
            state: gameState
        });
    }

    onAttackClick(attack) {
        var characters = this.state.playercharacters;

        this.setState({
            state: GameStates.PLAYER_ATT_MSG,
            attack: attack,
            message: characters.getName() + " used " + attack.getName()
        })
    }

    nextState() {
        switch(this.state.state)
        {
            case GameStates.PLAYER_ATT_MSG:
            {
                this.state.attack.affect(this.state.playercharacters, this.state.enemycharacters);
                this.enemyMove();
                break;
            }
            case GameStates.ENEMY_ATT_MSG:
            {
                this.state.attack.affect(this.state.enemycharacters, this.state.playercharacters);
                this.setState({
                    state: GameStates.IDLE
                })
                break;
            }
        }
    }

    enemyMove() {
        var characters = this.state.enemycharacters;
        var attacks = characters.attacks;
        var attack = attacks[Math.floor(Math.random()*attacks.length)];

        this.setState({
            state: GameStates.ENEMY_ATT_MSG,
            attack: attack,
            message: characters.getName() + " used " + attack.getName()
        })
    }

    render() {
        return <BattleScreen 
        changeGamestate={this.setGameState.bind(this)}
        onAttackClick={this.onAttackClick.bind(this)}
        onMessageAccepted={this.nextState.bind(this)}
        game={this.state} />
    }

}

export default Game;