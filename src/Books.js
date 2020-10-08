import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BookCard from "./Components/BooksCards";
import revolucaoDosBichosImg from "./assets/img/revolucaoDosBichos.png";
import divinaComediaImg from "./assets/img/divinaComedia.png";
import homoDeusImg from "./assets/img/homoDeus.png";
import sapiensImg from "./assets/img/sapiens.png";
import milNoventaOitentaQuatroImg from "./assets/img/milNoventaOitentaQuatro.png";
import eraDasRevolucoesImg from "./assets/img/eraDasRevolucoes.png";
import BookCardAlugado from "./Components/BookCardAlugado";
import BookCardDisponivel from "./Components/BookCardDisponivel";
import api from "./services/api";

class Books extends Component {
  static state = {
    livros: [
      {
        id: 1,
        name: "1984",
        autor: "George Orwell",
        description:
          "Ao lado de “A Revolução dos Bichos”, o livro “1984” é um dos mais famosos de George Orwell. A obra já ganhou versões de filmes, minisséries, quadrinhos, traduções para 65 países e uma polêmica fama, que não é à toa! Em seu último romance, o autor criou um personagem chamado Winston, que vive aprisionado em uma sociedade completamente dominada pelo Estado. Essa submissão ao poder, é relatada, inclusive, na rotina desse personagem, que trabalha com a falsificação de registos históricos, a fim de satisfazer os interesses presentes. Winston, contudo, não aceita bem essa realidade, que se disfarça de democracia, e vive questionando a opressão que o Partido e o Grande Irmão exercem sob a sociedade. A inspiração do livro vem dos regimes totalitários das décadas de 30 e 40 e, é assim, sob a ótica da ficção, que o autor faz com que seus leitores reflitam sobre o sistema de controle, que depois de tanto tempo ainda é muito questionado.",
        img: milNoventaOitentaQuatroImg,
      },
      {
        id: 2,
        name: "Revolução dos Bichos",
        autor: "George Orwell",
        description:
          "Verdadeiro clássico moderno, concebido por um dos mais influentes escritores do século 20, A Revolução dos Bichos é uma fábula sobre o poder. Narra a insurreição dos animais de uma granja contra seus donos. Progressivamente, porém, a revolução degenera numa tirania ainda mais opressiva que a dos humanos Escrita em plena Segunda Guerra Mundial e publicada em 1945 depois de ter sido rejeitada por várias editoras, essa pequena narrativa causou desconforto ao satirizar ferozmente a ditadura stalinista numa época em que os soviéticos ainda eram aliados do Ocidente na luta contra o eixo nazifascista. De fato, são claras as referências: o despótico Napoleão seria Stálin, o banido Bola-de-Neve seria Trotsky, e os eventos políticos - expurgos, instituição de um estado policial, deturpação tendenciosa da História - mimetizam os que estavam em curso na União Soviética. Com o acirramento da Guerra Fria, as mesmas razões que causaram constrangimento na época de sua publicação levaram A revolução dos bichos a ser amplamente usada pelo Ocidente nas décadas seguintes como arma ideológica contra o comunismo. O próprio Orwell, adepto do socialismo e inimigo de qualquer forma de manipulação política, sentiu-se incomodado com a utilização de sua fábula como panfleto.",
        img: revolucaoDosBichosImg,
      },
      {
        id: 3,
        name: "Divina Comedia",
        autor: "Dante Alighierri",
        description:
          "A Divina Comédia é uma das obras poéticas fundamentais da literatura mundial. Seu impacto sobre os contemporâneos de Dante foi enorme e quase imediato. Já no século XIV criavam-se em toda Itália cátedras especiais para interpretar seu conteúdo alegórico. A posteridade só confirmou sua grandeza. Dante começou a escrevê-la em 1308 e trabalhou nela até pouco antes de sua morte. Nela, o trágico não constituiu elemento essencial, e a língua e o estilo empregados são simples e naturais. Acompanhado por Virgílio, o poeta percorre o Inferno, o Purgatório e o Paraíso.",
        img: divinaComediaImg,
      },
      {
        id: 4,
        name: "Era das Revoluções",
        autor: "Eric J. Hobsbawn",
        description:
          "Em A Era das Revoluções o autor trata dos principais desenvolvimentos históricos deste período, construindo a imagem de uma sociedade produzida pelas 'revoluções' e abordando o surgimento de termos que empregamos até hoje, como industrial, classe média, nacionalismo, etc.",
        img: eraDasRevolucoesImg,
      },
      {
        id: 5,
        name: "Homo Deus",
        autor: "Yuval Noah Harari",
        description:
          "Neste “Homo Deus”: uma breve história do amanhã, Yuval Noah Harari, autor do estrondoso best-seller Sapiens: uma breve história da humanidade, volta a combinar ciência, história e filosofia, desta vez para entender quem somos e descobrir para onde vamos. Sempre com um olhar no passado e nas nossas origens, Harari investiga o futuro da humanidade em busca de uma resposta tão difícil quanto essencial: depois de séculos de guerras, fome e pobreza, qual será nosso destino na Terra? A partir de uma visão absolutamente original de nossa história, ele combina pesquisas de ponta e os mais recentes avanços científicos à sua conhecida capacidade de observar o passado de uma maneira inteiramente nova. Assim, descobrir os próximos passos da evolução humana será também redescobrir quem fomos e quais caminhos tomamos para chegar até aqui.",
        img: homoDeusImg,
      },
      {
        id: 6,
        name: "Sapiens",
        autor: "Yuval Noah Harari",
        description:
          "O autor repassa a história da humanidade, ou do homo sapiens, desde o surgimento da espécie durante a pré-história até o presente, mas em vez de apenas “inventariar” os fatos históricos ele os relaciona com questões do presente e os questiona de maneira surpreendente. Além disso, para cada fato ou crença que temos como certa hoje em dia, o autor apresenta as diversas interpretações existentes a partir de diferentes pontos de vista, inclusive as muito atuais, e vai além, sugerindo interpretações muitas vezes desconcertantes. Yuval Noah Harari é professor do departamento de história da Universidade Hebraica de Jerusalém. É especialista em história mundial, medieval e militar.",
        img: sapiensImg,
      },
      {
        id: 7,
        name: "Sapiens 2",
        autor: "Yuval Noah Harari",
        description:
          "O autor repassa a história da humanidade, ou do homo sapiens, desde o surgimento da espécie durante a pré-história até o presente, mas em vez de apenas “inventariar” os fatos históricos ele os relaciona com questões do presente e os questiona de maneira surpreendente. Além disso, para cada fato ou crença que temos como certa hoje em dia, o autor apresenta as diversas interpretações existentes a partir de diferentes pontos de vista, inclusive as muito atuais, e vai além, sugerindo interpretações muitas vezes desconcertantes. Yuval Noah Harari é professor do departamento de história da Universidade Hebraica de Jerusalém. É especialista em história mundial, medieval e militar.",
        img: sapiensImg,
      },
      {
        id: 8,
        name: "Sapiens 3",
        autor: "Yuval Noah Harari",
        description:
          "O autor repassa a história da humanidade, ou do homo sapiens, desde o surgimento da espécie durante a pré-história até o presente, mas em vez de apenas “inventariar” os fatos históricos ele os relaciona com questões do presente e os questiona de maneira surpreendente. Além disso, para cada fato ou crença que temos como certa hoje em dia, o autor apresenta as diversas interpretações existentes a partir de diferentes pontos de vista, inclusive as muito atuais, e vai além, sugerindo interpretações muitas vezes desconcertantes. Yuval Noah Harari é professor do departamento de história da Universidade Hebraica de Jerusalém. É especialista em história mundial, medieval e militar.",
        img: sapiensImg,
      },
      {
        id: 9,
        name: "Sapiens 4",
        autor: "Yuval Noah Harari",
        description:
          "O autor repassa a história da humanidade, ou do homo sapiens, desde o surgimento da espécie durante a pré-história até o presente, mas em vez de apenas “inventariar” os fatos históricos ele os relaciona com questões do presente e os questiona de maneira surpreendente. Além disso, para cada fato ou crença que temos como certa hoje em dia, o autor apresenta as diversas interpretações existentes a partir de diferentes pontos de vista, inclusive as muito atuais, e vai além, sugerindo interpretações muitas vezes desconcertantes. Yuval Noah Harari é professor do departamento de história da Universidade Hebraica de Jerusalém. É especialista em história mundial, medieval e militar.",
        img: sapiensImg,
      },
      {
        id: 10,
        name: "Sapiens 5",
        autor: "Yuval Noah Harari",
        description:
          "O autor repassa a história da humanidade, ou do homo sapiens, desde o surgimento da espécie durante a pré-história até o presente, mas em vez de apenas “inventariar” os fatos históricos ele os relaciona com questões do presente e os questiona de maneira surpreendente. Além disso, para cada fato ou crença que temos como certa hoje em dia, o autor apresenta as diversas interpretações existentes a partir de diferentes pontos de vista, inclusive as muito atuais, e vai além, sugerindo interpretações muitas vezes desconcertantes. Yuval Noah Harari é professor do departamento de história da Universidade Hebraica de Jerusalém. É especialista em história mundial, medieval e militar.",
        img: sapiensImg,
      },
    ],
  };

  render() {
    let booksCards = Books.state.livros.map((book) => {
      console.log("teste", book);
      return book.status ? (
        <Grid item xs={12} sm={6} md={4}>
          <BookCardAlugado book={book} />
        </Grid>
      ) : (
        <Grid item xs={12} sm={6} md={4}>
          <BookCardDisponivel book={book} />
        </Grid>
      );
    });
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <Grid
            container
            spacing={2}
            style={{ marginTop: "24px", marginBottom: "24px" }}
          >
            {booksCards}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}
export default Books;
