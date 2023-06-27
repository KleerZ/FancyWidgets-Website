export class Docs {
  public static welcome: string = `
  Welcome to the documentation of the C# and Avalonia widget library, specifically designed for Windows 10 and 11!

Here you'll find all the information you need to use our library and create stunning, interactive widgets that will delight Windows 10 and 11 users.

Our library provides powerful tools and features to help you quickly and easily develop customizable widgets using C# syntax and the benefits of the Avalonia platform. We provide support for the latest versions of the Windows operating system so that your applications will run on modern devices and look sleek and modern.

Our team is constantly updating and improving the documentation so that you have access to the most up-to-date information and guides.

We strive to make your development process as easy and efficient as possible, so feel free to refer to the documentation as you work on your projects. If you have any questions or need help, our support team is here to help you.

Thank you for choosing our library! We hope that it will help you create stunning widgets that will give your applications a modern and attractive look on Windows 10 and 11 operating systems. Good luck with your creative development process!
  `

  public static gettingStarted: string = `
    # Getting Started

This guide will walk you through the process of getting started with the FancyWidgets library for creating widgets using C# and Avalonia. The library is designed specifically for Windows 10 and 11, and supports .NET 6-7 and Avalonia 11.

## Installation

To begin, you need to download the FancyWidgets library from NuGet. You can find the package at the following [NuGet](https://www.nuget.org/packages/FancyWidgets)

## Creating the Project

To create a project using FancyWidgets, follow these steps:

1. Create a basic Avalonia project.
2. Create a class library that will serve as your widget library.
3. In the \`App.axaml\` file of your Avalonia project, add the following code within the \`<Application.Styles>\` tags to include Fluent styles:

\`\`\`xml
<Application.Styles>
    <FluentTheme/>
</Application.Styles>
\`\`\`

> If you don't have FluentTheme, install the \`Avalonia.Themes.Fluent\` library

## Creating a Widget

In your widget class library, create a widget class and its corresponding ViewModel. Here's an example code snippet:

\`\`\`csharp
public partial class CustomWidget : Widget<CustomWidgetViewModel>
{
    public CustomWidget()
    {
        InitializeComponent();
#if DEBUG
        this.AttachDevTools();
#endif
    }

    private void InitializeComponent()
    {
        AvaloniaXamlLoader.Load(this);
        ViewModel = new CustomWidgetViewModel();
        DataContext = ViewModel;
    }
}
\`\`\`

## Widget Program

In your class library, create a class named \`WidgetProgram\` and define a \`Main\` method. Follow this structure:

\`\`\`csharp
public static void Main()
{
    var builder = WidgetApplication.CreateBuilder();
    builder.RegisterType<CustomWidget>()
        .As<Widget<CustomWidgetViewModel>>()
        .SingleInstance();

    WidgetLocator.Current.Resolve<Widget<CustomWidgetViewModel>>().Show();
}
\`\`\`

> Make sure to register your widget as a \`SingleInstance\`. Currently, widgets cannot have child widgets. Dependency registration currently uses only Autofac.

## ReactiveUI Integration

In your Avalonia project, install the ReactiveUI library and add it to the \`Program.cs\` class. Here's an example of how to do it:

\`\`\`csharp
public static AppBuilder BuildAvaloniaApp()
    => AppBuilder.Configure<App>()
        .UsePlatformDetect()
        .LogToTrace()
        .UseReactiveUI();
\`\`\`

Next, navigate to the \`App.axaml.cs\` file and within the \`OnFrameworkInitializationCompleted()\` method, call \`WidgetProgram.Main()\`. This step is only required during development:

\`\`\`csharp
public override void OnFrameworkInitializationCompleted()
{
    if (ApplicationLifetime is IClassicDesktopStyleApplicationLifetime desktop)
    {
        WidgetProgram.Main();
    }

    base.OnFrameworkInitializationCompleted();
}
\`\`\`

> The avalonia project that runs the widget through WidgetProgram.Main() is only needed for development time. The class library itself with the widget is the main project.

That's it! You have now completed the initial setup for using FancyWidgets library with C# and Avalonia. Feel free to explore the library further, refer to the documentation for more details, and start creating amazing interactive widgets for Windows 10 and 11. Happy coding!

  `

  public static contextMenu: string = `
  # Widget Context Menu

The FancyWidgets library provides a context menu feature for each widget, which can be accessed by pressing \`CTRL + Right Click\`. This context menu can be extended with custom buttons. To create a custom button, follow these steps:

1. Create a class for your button, such as \`TestButton\`, and inherit from the \`WidgetContextMenuButton\` class. Implement the necessary properties and methods. Here's an example code snippet:

\`\`\`csharp
public class TestButton : WidgetContextMenuButton
{
    public override int Order { get; protected set; } = 1;
    public override string Content { get; set; } = "Test Button";

    protected override void Execute()
    {
        // Add your button's execution logic here
    }
}
\`\`\`

- The \`Order\` property is used to specify the position of the button among other buttons.
- The \`Content\` property is used to display the name of the button.
- The \`Execute\` method will be executed when the button is clicked.

2. Next, in the \`WidgetProgram\` class, register your button in the dependencies. Here's an example code snippet:

\`\`\`csharp
builder.RegisterType<TestButton>()
       .As<WidgetContextMenuButton>();
\`\`\`

By registering your button, you make it available for use in the widget's context menu.

That's it! You have now created a custom button for the widget's context menu. You can add more buttons by creating additional classes that inherit from \`WidgetContextMenuButton\` and registering them in the \`WidgetProgram\` class.


# Widget Settings

Each widget in FancyWidgets has a settings option in its context menu, which can be accessed by clicking the \`Settings\` button. These settings can be extended with custom functionality, such as changing colors, fonts, and more.

To create a custom setting, follow these steps:

1. Create a class for your setting, for example \`SettingButton\`, and inherit it from the desired component, which in this example is \`ButtonPanel\`. Implement the \`ISettingsControl\` interface. Here's a sample code snippet:

\`\`\`csharp
public class SettingButton : ButtonPanel, ISettingsControl
{
    public int Order { get; set; } = 1;
    public Control Control => this;

    public SettingButton()
    {
        Title = "Change the text color to red";
        ButtonControl.Content = "Click";
        ButtonControl.Click += (_, _) =>
        {
            // Add your setting's logic here
        };
    }
}
\`\`\`

- The \`Order\` property is used to specify the position of the setting among other settings.
- The \`Control\` property is a reference to the current control.

The \`ButtonPanel\` component used in the example contains the \`Title\` property and the \`ButtonControl\` button.

2. After creating your custom setting, register it in the dependencies in the \`WidgetProgram\` class. Here's an example code snippet:

\`\`\`csharp
builder.RegisterType<SettingButton>()
       .As<ISettingsControl>();
\`\`\`

By registering your custom setting, you make it available for use in the widget's settings.

  `

  public static settings: string = `
  # Widget Settings

Each widget in FancyWidgets has a settings option in its context menu, which can be accessed by clicking the \`Settings\` button. These settings can be extended with custom functionality, such as changing colors, fonts, and more.

To create a custom setting, follow these steps:

1. Create a class for your setting, for example \`SettingButton\`, and inherit it from the desired component, which in this example is \`ButtonPanel\`. Implement the \`ISettingsControl\` interface. Here's a sample code snippet:

\`\`\`csharp
public class SettingButton : ButtonPanel, ISettingsControl
{
    public int Order { get; set; } = 1;
    public Control Control => this;

    public SettingButton()
    {
        Title = "Change the text color to red";
        ButtonControl.Content = "Click";
        ButtonControl.Click += (_, _) =>
        {
            // Add your setting's logic here
        };
    }
}
\`\`\`

- The \`Order\` property is used to specify the position of the setting among other settings.
- The \`Control\` property is a reference to the current control.

The \`ButtonPanel\` component used in the example contains the \`Title\` property and the \`ButtonControl\` button.

2. After creating your custom setting, register it in the dependencies in the \`WidgetProgram\` class. Here's an example code snippet:

\`\`\`csharp
builder.RegisterType<SettingButton>()
       .As<ISettingsControl>();
\`\`\`

By registering your custom setting, you make it available for use in the widget's settings.


  `

  public static settingsProvider: string = `
  # SettingsProvider

The \`SettingsProvider\` class allows interaction with saving and loading widget settings dynamically. To obtain an instance of \`ISettingsProvider\`, you can retrieve it from the DI (Dependency Injection) container using \`WidgetLocator.Current.Resolve<ISettingsProvider>()\` or by injecting \`ISettingsProvider\` into the constructor.

To initialize the \`SettingsProvider\` in the \`WidgetProgram\` class, you need to call the \`InitializeSettings()\` method:

\`\`\`csharp
WidgetLocator.Current.Resolve<ISettingsProvider>().InitializeSettings();
\`\`\`

To automatically save and restore property values, follow these steps:

1. Inherit your ViewModel class from \`WidgetReactiveObject\`. This class provides the necessary functionality for automatic property value management.

2. Mark the properties you want to save and restore with the \`[ConfigurableProperty]\` attribute. Here's an example:

\`\`\`csharp
public class TestViewModel : WidgetReactiveObject
{
    private IBrush _textColor = Brushes.Azure;

    [ConfigurableProperty]
    public IBrush TextColor
    {
        get => _textColor;
        set => this.RaiseAndSetIfChanged(ref _textColor, value);
    }
}
\`\`\`

- The \`[ConfigurableProperty]\` attribute indicates that the property should be saved and restored.
- You can specify a custom ID for the property using \`[ConfigurableProperty("CustomId")]\`. This ID can be used to refer to the property when interacting with the \`SettingsProvider\`.

> Ensure that you provide a default value for each property. For example, \`_textColor = Brushes.Azure\` sets the default value of \`TextColor\` to \`Brushes.Azure\`.

To modify the value of a property and save it using the \`SettingsProvider\`, follow these steps:

1. Retrieve the \`SettingsProvider\` instance:

\`\`\`csharp
var settingsProvider = WidgetLocator.Current.Resolve<ISettingsProvider>();
\`\`\`

2. Use the \`SetValue\` method to update the property value:

\`\`\`csharp
settingsProvider.SetValue(typeof(TestViewModel).FullName, nameof(TestViewModel.TextColor), Brush.Parse("red"));
\`\`\`

- If you specified a custom ID for the property, you can use that instead of the property name:

\`\`\`csharp
settingsProvider.SetValue("CustomId", Brush.Parse("red"));
\`\`\`

These steps allow you to modify the property value and have it automatically saved by the \`SettingsProvider\`.

  `

  public static di: string = `
  # Dependency Injection (DI)

In FancyWidgets, Autofac is currently used for dependency injection in widgets. To create and retrieve dependencies, follow these steps:

1. Create a container builder using the \`WidgetApplication.CreateBuilder()\` method:

\`\`\`csharp
var builder = WidgetApplication.CreateBuilder();
// Add your dependencies here
builder.BuildContainer();
\`\`\`

2. Add your dependencies to the container builder. This step ensures that your dependencies are available for injection throughout the application.

\`\`\`csharp
builder.RegisterType<SettingButton>()
       .AsSelf();
\`\`\`

By registering the \`SettingButton\` class, you make it available for injection and allow the container to resolve its dependencies.

3. To retrieve dependencies, you can use the \`WidgetLocator\` class. Here's an example:

\`\`\`csharp
var settingsProvider = WidgetLocator.Current.Resolve<ISettingsProvider>();
\`\`\`

The \`WidgetLocator.Current.Resolve<T>()\` method retrieves an instance of the specified type (\`ISettingsProvider\` in this case) from the container.

Alternatively, you can inject dependencies into a class constructor. Here's an example:

\`\`\`csharp
public SettingButton(ISettingsProvider settingsProvider)
{
    // Use the settingsProvider instance here
}
\`\`\`

By including the \`ISettingsProvider\` parameter in the constructor, you enable the container to automatically inject the required dependency when creating an instance of the \`SettingButton\` class.

> Remember to register the \`SettingButton\` class in the container before passing dependencies to its constructor:

\`\`\`csharp
builder.RegisterType<SettingButton>()
       .AsSelf();
\`\`\`

Explore further possibilities and configure your dependencies according to your specific requirements.

  `

  public static components: string = ""
}
