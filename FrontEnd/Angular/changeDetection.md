https://medium.com/sjk5766/angular-change-detection-%EC%84%B1%EB%8A%A5-%ED%96%A5%EC%83%81%EB%B0%A9%EB%B2%95-onpush-changedetectionref-71c9bccf0a42

markForCheck():  Marks all ChangeDetectionStrategy ancestors as to be checked.
detectChanges():  Checks the change detector and its children.

Does it means that markForCheck is **from the root to the calling component** and detectChanges is **from the calling component to all children?**
Doesn’t change detection always happens from root even when calling detectChanges?
I saw markForCheck used with **OnPush when mutating an object or receiving a change outside of angular zone** and detectChanges when **we want to trigger a check in a detached component.**

출처 : https://medium.com/@pablo.platt/can-you-please-explain-when-to-use-markforcheck-and-when-detectchanges-52e281783c6