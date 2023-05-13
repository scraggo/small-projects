# Phoenix Project Highlights

_The Phoenix Project_ A Novel About IT, DevOps, and Helping Your Business Win IT (2013)

Gene Kim, Kevin Behr, George Spafford

Finished 2022-07-11 as part of Tech book club

_Warning: spoilers ahead_!

## Big Ideas

To guide Parts Unlimited, Erik Reid orients us with _The Three Ways_:

**The First Way** helps us understand how to create fast flow of work as it moves from Development into IT Operations, because that’s what’s between the business and the customer.
- _Kanban_ - a three column system used originally by Toyota to create work visibility
- Company and IT Goal Alignment - Bill Palmer (Tech VP) and John Pesche (Security) take the initiative to understand the company goals outlined by Dick Landry, CFO. By doing this type of "systems thinking", they're trying to ensure the entire organization achieves its goal, not just IT.
- Regular maintenance as KPI (Key Performance Indicator): Preventive oil changes and vehicle maintenance policies are like preventive vendor patches and change management policies. By showing how IT risks jeopardize business performance measures, you can start making better business decisions.
- Work that moves backwards through the pipeline necessitates rework - which is waste.

**The Second Way** shows us how to shorten and amplify feedback loops, so we can fix quality at the source and avoid rework.
- Getting faster feedback from stakeholders is key. Smaller batch sizes (releases) helps!
- _takt time_: the cycle time needed in order to keep up with customer demand. Phoenix deployment with large batch sizes couldn't keep up w/ customer demand.
- Just like Parts Unlimited's plant combined the paint and heat stations (the slowest part of the process), you can create a deployment pipeline with source code and infrastructure in git, deployable artifacts. Erik proposes 10 deploys in one day, a key inspiration being John Allspaw and Paul Hammond from Flickr.
  - Book: _Continuous Delivery_. Web resources:
    - [Continuous Delivery by David Farley and Jez Humble](https://www.amazon.com/Continuous-Delivery-Deployment-Automation-Addison-Wesley/dp/0321601912)
    - [John Allspaw Discusses Devops and Continuous Delivery | Thoughtworks](https://www.thoughtworks.com/insights/blog/john-allspaw-discusses-devops-and-continuous-delivery)
    - [Matt Callanan's Blog: John Allspaw & Paul Hammond: 10+ Deploys Per Day: Dev and Ops Cooperation at Flickr](http://blog.mattcallanan.net/2012/03/john-allspaw-paul-hammond-10-deploys.html)
    - [10+ Deploys Per Day: Dev and Ops Cooperation at Flickr](https://www.slideshare.net/jallspaw/10-deploys-per-day-dev-and-ops-cooperation-at-flickr)

**The Third Way** shows us how to create a culture that simultaneously fosters experimentation, learning from failure, and understanding that repetition and practice are the prerequisites to mastery.
- _kata_ - making improvement a habit - small improvements regularly. Practice -> habits -> mastery. Repetition, especially for things that require teamwork, creates trust and transparency.
- "Improving daily work is even more important than doing daily work." The Third Way is all about ensuring that we’re continually putting tension into the system, so that we’re continually reinforcing habits and improving something.
  - Biweekly outage drills to improve team and inter-team processes.
- Resilience engineering tells us that we should routinely inject faults into the system, doing them frequently, to make them less painful.
  - Bill implements this with Project Narwhal aka “Simian Army Chaos Monkey” project - (Apple / Netflix) we deployed code that routinely created large-scale faults, thus randomly killing processes or entire servers. John followed suit with project “Evil Chaos Monkey” which would constantly try to exploit security holes, fuzz our applications with storms of malformed packets, try to install backdoors, gain access to confidential data, and all sorts of other nefarious attacks.
    - > this is the fastest means to institutionalize Erik’s Third Way. We need to create a culture that reinforces the value of taking risks and learning from failure and the need for repetition and practice to create mastery.

See [The Three Ways: The Principles Underpinning DevOps - IT Revolution - August 22, 2012 by Gene Kim](https://itrevolution.com/the-three-ways-principles-underpinning-devops/)

_Work_ is the entry point of the production pipeline. There are four types of work:
- business projects
- internal (IT)
- changes, and change management
- unplanned (recovery)

_flow_ is the total measurement of the speed that work can move through the pipeline

Having more Work in Progress (WIP) than can be worked on indicates that constraints aren't being accounted for.
- Freezing all non-Phoenix projects allowed IT to focus and remove bottlenecks. Room for improvement: too much WIP causing unplanned work, releases are too large

_constraints_ are the slowest parts of the system
- **any improvements made anywhere besides the bottleneck are an illusion.**
- employee Brent is a constraint because much of what he knows is siloed from the other employees
- The five focusing steps which Goldratt describes in The Goal:
  - **Step 1**: Identify the system’s bottlenecks
  - **Step 2**: Decide how to exploit those bottlenecks. Make sure that the constraint is not allowed to waste any time. it should always be working on the highest priority commitment the IT Operations organization has made to the rest of the enterprise.
  - **Step 3**: Subordinate every other decision to 'step two decisions'. Release all work in accordance to the rate it could be consumed by the heat treat ovens, which was his plant’s bottleneck. [DBR (Drum Buffer Rope) Theory | Lean Manufacturing](http://www.lean-manufacturing-japan.com/scm-terminology/dbr-drum-buffer-rope-theory.html)
  - **Step 4**: Elevate the systems bottlenecks
  - **Step 5**: if, in a previous step, a bottleneck has been broken, go back to the beginning (Step 1).
  - See [The Goal Summary & Book Review - Theory of Constraints Institute](https://www.tocinstitute.org/the-goal-summary.html)

Work centers, workers, and resources

In Chapter 20, they begin to see more clearly why Brent is a constraint. He's _one_ worker who's supporting too many work centers (projects). Given that all those projects depend on him, _Queuing Theory_ shows that the more often he (the resource) is busy, the longer tasks have to wait:

> The wait time is the ‘percentage of time busy’ divided by the ‘percentage of time idle.’ In other words, if a resource is fifty percent busy, then it’s fifty percent idle. The wait time is fifty percent divided by fifty percent, so one unit of time. Let’s call it one hour. So, on average, our task would wait in the queue for one hour before it gets worked. “On the other hand, if a resource is ninety percent busy, the wait time is ‘ninety percent divided by ten percent’, or nine hours. In other words, **our task would wait in queue nine times longer than if the resource were fifty percent idle.**”

See [The Beginner’s Guide to Queuing theory | Qminder](https://www.qminder.com/blog/queue-management/queuing-theory-guide/)

## Chapter highlights

Chapter 4

Bill: I nod silently but refuse to say more. I always liked that phrase in Saving Private Ryan: “There’s a chain of command: gripes go up, not down.”

Notable: The way Bill goes from gathering company info, putting out fires, to getting Erik's help

Chapter 6

Classic "diminisher" - trying to get more staffing to help the project along (_Mythical Man Month_, _Multipliers_)

First principles: Meeting about change management. They use index cards instead of their archaic system.

Chapter 7

Erik proposes the definition of "work" - four types
- business project work
- internal (IT)
- changes, and change management
- unplanned work (recovery)

WIP: one of the most critical mechanisms in the management of any plant is job and materials release. Without it, you can’t control WIP.

Flow tempo is set by the speed that the slowest constraint can finish work

any improvements made anywhere besides the bottleneck are an illusion.

The three ways:
- The First Way helps us understand how to create fast flow of work as it moves from Development into IT Operations, because that’s what’s between the business and the customer.
  - Kanban (Chapter 15)
- The Second Way shows us how to shorten and amplify feedback loops, so we can fix quality at the source and avoid rework.
- the Third Way shows us how to create a culture that simultaneously fosters experimentation, learning from failure, and understanding that repetition and practice are the prerequisites to mastery.

Chapter 8

Brent is a main constraint

Chapter 12

I smirk at the reference to smoke tests, a term circuit designers use. The saying goes, “If you turn the circuit board on and no smoke comes out, it’ll probably work.”

Chapter 15

_But problems, like dog poop left in the rain, rarely get better just by ignoring them._

Erik: “Unlike the other categories of work, unplanned work is recovery work, which almost always takes you away from your goals. That’s why it’s so important to know where your unplanned work is coming from.”

Erik: There are five focusing steps which Goldratt describes in The Goal:

- **Step 1 is to identify the constraint**. Remember, any improvement not made at the constraint is just an illusion, yes?
- “**Step 2 is to exploit the constraint**,” make sure that the constraint is not allowed to waste any time. it should always be working on the highest priority commitment the IT Operations organization has made to the rest of the enterprise.
- **Step 3, which is to subordinate the constraint**. In the Theory of Constraints, this is typically implemented by something called Drum-Buffer-Rope. release all work in accordance to the rate it could be consumed by the heat treat ovens, which was his plant’s bottleneck.

Chapter 20

Erik corrects Bill when he says that Brent is a "work center": “The heat treat oven is a work center, which has workers associated with it. You asked what work centers are our constraints, and I told you that it was Brent, which can’t be right, because Brent isn’t a work center. “**Brent is a worker, not a work center**,” I say again. “And I’m betting that **Brent is probably a worker supporting way too many work centers. Which is why he’s a constraint.**”

Erik: “every work center is made up of four things: the machine, the man, the method, and the measures. Suppose for the machine, we select the heat treat oven. The men are the two people required to execute the predefined steps, and we obviously will need measures based on the outcomes of executing the steps in the method.”

Manufacturing: bill of materials. IT: _bill of resources_ - Erik: "That’s the bill of materials along with the list of the required work centers and the routing. Once you have that, along with the work orders and your resources, you’ll finally be able to get a handle on what your capacity and demand is. This is what will enable you to finally know whether you can accept new work and then actually be able to schedule the work."

‘Improving daily work is even more important than doing daily work.’ The Third Way is all about ensuring that we’re continually putting tension into the system, so that we’re continually reinforcing habits and improving something. Resilience engineering tells us that we should routinely inject faults into the system, doing them frequently, to make them less painful.
- Improve _anything_ - because entropy guarantees if you're not growing you're getting worse
- _kata_ - making improvement a habit - small improvements regularly

Utilization - if a part is 50% utilized, it's one unit of work time and one unit of wait time. 99% is a very long time to wait.

“A critical part of the Second Way is making wait times visible, so you know when your work spends days sitting in someone’s queue—or worse, when work has to go backward, because it doesn’t have all the parts or requires rework. ... we found that for the majority of time, the parts were just sitting in queues. In other words, the ‘touch time’ was a tiny fraction of ‘total process time.’

Chapter 23

“The wait time is the ‘percentage of time busy’ divided by the ‘percentage of time idle.’ In other words, if a resource is fifty percent busy, then it’s fifty percent idle. The wait time is fifty percent divided by fifty percent, so one unit of time. Let’s call it one hour. So, on average, our task would wait in the queue for one hour before it gets worked.

**Queue theory - Brent is the resource:** “On the other hand, if a resource is ninety percent busy, the wait time is ‘ninety percent divided by ten percent’, or nine hours. In other words, our task would wait in queue nine times longer than if the resource were fifty percent idle.”

Chapter 25

Dick answers John's naive-seeming questions. **Dick's goals reveal: he’s talking about Erik’s First Way / systems thinking, always confirming that the entire organization achieves its goal, not just one part of it.**

Erik: “**This is all about scoping what really matters inside of IT.** And like when Mr. Sphere told everyone in Flatland, you must leave the realm of IT to discover where the business relies on IT to achieve its goals.”

“Our organizational key performance indicator (KPI) is on-time delivery. So to achieve it, you would create a new forward-looking KPI of, say, the percentage of vehicles that have had their required oil changes performed.

**Preventive oil changes and vehicle maintenance policies are like preventive vendor patches and change management policies. By showing how IT risks jeopardize business performance measures, you can start making better business decisions.**

Chapter 26

Bill: We’ve spent over $20 million on Phoenix over three years. With all that WIP and capital locked inside the project, it will likely never clear the ten percent internal hurdle rate. **In other words, Phoenix should not have been approved.**

Chapter 28

Third Way: Practice -> habits -> mastery. Repetition, especially for things that require teamwork, creates trust and transparency. biweekly outage drills.

Chapter 29

Erik:
- The First Way is all about controlling the flow of work from Development to IT Operations. You’ve improved flow by freezing and throttling the project releases, but your batch sizes are still way too large. The deployment failure on Friday is proof. You also have way too much WIP still trapped inside the plant, and the worst kind, too. Your deployments are causing unplanned recovery work downstream.”
- 2nd way: “Now you must prove that you can master the Second Way, creating constant feedback loops from IT Operations back into Development, designing quality into the product at the earliest stages. To do that, you can’t have nine-month-long releases. You need much faster feedback.
  - Turning around, he says, “In any system of work, the theoretical ideal is single-piece flow, which maximizes throughput and minimizes variance. You get there by continually reducing batch sizes.
  - “You’re doing the exact opposite by lengthening the Phoenix release intervals and increasing the number of features in each release. You’ve even lost the ability to control variance from one release to the next.”

“The flow of work should ideally go in one direction only: forward. When I see work going backward, I think ‘waste.’ It might be because of defects, lack of specification, or rework… Regardless, it’s something we should fix.”

Chapter 30

Bill calls Erik, Bill discovers Erik was also in the military. Erik says Bill must think like a plant manager, not a manager of a single work center. A plant manager harvests his "inner Allspaw."

_takt time_: the cycle time needed in order to keep up with customer demand. Phoenix deployment doesn't keep up w/ customer demand.

paint and heat - "die changeover" - why not combine into a single machine? production time went way down.

Erik proposes 10 deploys in one day. John Allspaw and Paul Hammond from Flickr did it. Book: _Continuous Delivery_.
- you need to create a deployment pipeline - everything in git, infra as code

Chapter 35

Against my expectations, everyone jumped enthusiastically on Project Narwhal otherwise known as the “Simian Army Chaos Monkey” project. Like the legendary stories of the original Apple Mac OS and Netflix cloud delivery infrastructure, **we deployed code that routinely created large-scale faults, thus randomly killing processes or entire servers.**

John loved this, and started a new project called “Evil Chaos Monkey.” Instead of generating operational faults in production, it would constantly try to exploit security holes, fuzz our applications with storms of malformed packets, try to install backdoors, gain access to confidential data, and all sorts of other nefarious attacks.

**this is the fastest means to institutionalize Erik’s Third Way**. We need to create a culture that reinforces the value of taking risks and learning from failure and the need for repetition and practice to create mastery.

Erik to Bill: “I want to improve the lives of one million IT workers in the next five years. As someone wise once told me, ‘Messiahs are good, but scripture is better.’” “I want you to write a book, describing the Three Ways and how other people can replicate the transformation you’ve made here at Parts Unlimited. Call it The DevOps Cookbook and show how IT can regain the trust of the business and end decades of intertribal warfare. Can you do that for me?”
