# Brainstorming #

https://www.mindmup.com/#m:g10BzrrP6CLqHXZRldnUWRZb0dyaTg


* Client
Projeto
 * Documentação
  - Fluxo de aprovação (status do documento)
  - Comentários para cada documento, para possibilitar controle das alterações solicitadas.
 * Controle de tarefas (Inspirar no GitHub)
  - Criar todas as tarefas que serão executadas no projeto.
  - Controle de tempo em que cada tarefa esta sendo executada. (Inspirar no https://www.toggl.com/)
 * Controle de Interações

User
  - Atributos
    - Nome
    - Email
    - password
    - Avatar
Clients
  - Atributos
    - Nome
    - Cor
Projects
  - Atributos
    - Nome
    - Código
    - Cor
    - Client
////////////////////////////////////////////////////////  
Document
  - Atributos
    - Nome
    - Código
Document Comment 
  - Atributos
    - Text
    - reaction (Emotion...)
////////////////////////////////////////////////////////
Iterações
  - Atributos
    - inicio
    - fim
    - Issue track
////////////////////////////////////////////////////////    
Work Item
  - Atributos
    - title
    - text
    - points
    - Resolution
    - priority (1, 2, 3, 4, 5) /Tornar configurável por projeto
    - severity (1- Blocker, 2- Critical, 3- Major, 4- Minor, 5- Trivial) / Tornar configurável por projeto
    - Status /Tornar configurável por projeto 
    - Tag /Tornar configurável por projeto
    - Milestones /Tornar configurável por projeto
    - Comments
    - Timer
Work item Timer
  - Atributos
    - inicio
    - fim
    - usuario
Work item Comment
  - Atributos
    - Text
    - reaction (Emotion...)
Work item Labels 
  - Atributos
    - Nome
    - Cor
Work item Milestone
  - Atributos
    - Nome
    - Cor

https://issues.sonatype.org/secure/ShowConstantsHelp.jspa?decorator=popup#PriorityLevels
https://confluence.atlassian.com/adminjiraserver071/defining-priority-field-values-802592398.html